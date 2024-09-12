"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "openAIResponseStream", {
    enumerable: true,
    get: function() {
        return openAIResponseStream;
    }
});
function _stream() {
    const data = require("stream");
    _stream = function() {
        return data;
    };
    return data;
}
class OpenAIResponseStream extends _stream().Readable {
    openAIIterable;
    reading;
    result;
    responseContentType = "application/octet-stream";
    constructor(openAIIterable, options = {}){
        super(options);
        this.openAIIterable = openAIIterable;
        this.reading = false;
        this.result = "";
    }
    processChunk() {
        let isFunctionStreaming;
        return (json)=>{
            if (json.choices[0]?.delta?.function_call?.name) {
                isFunctionStreaming = true;
                return `{"function_call": {"name": "${json.choices[0]?.delta?.function_call.name}", "arguments": "`;
            }
            if (json.choices[0]?.delta?.function_call?.arguments) {
                const argumentChunk = json.choices[0].delta.function_call.arguments;
                const escapedPartialJson = argumentChunk.replace(/\\/g, "\\\\") // Replace backslashes first to prevent double escaping
                .replace(/\//g, "\\/") // Escape slashes
                .replace(/"/g, '\\"') // Escape double quotes
                .replace(/\n/g, "\\n") // Escape new lines
                .replace(/\r/g, "\\r") // Escape carriage returns
                .replace(/\t/g, "\\t") // Escape tabs
                .replace(/\f/g, "\\f"); // Escape form feeds
                return `${escapedPartialJson}`;
            }
            if (isFunctionStreaming && (json.choices[0]?.finish_reason === "function_call" || json.choices[0]?.finish_reason === "stop")) {
                isFunctionStreaming = false;
                return '"}}';
            }
            return json.choices?.[0]?.delta?.content ?? json.choices?.[0]?.text;
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async _read() {
        if (this.reading) return;
        this.reading = true;
        const process = this.processChunk();
        try {
            for await (const part of this.openAIIterable){
                const content = process(part);
                if (content) {
                    this.result += content;
                    this.push(content);
                }
            }
            this.push(null);
            this.reading = false;
        } catch (err) {
            this.emit("error", err);
        }
    }
}
function openAIResponseStream(openAIIterable, options = {}) {
    const stream = new OpenAIResponseStream(openAIIterable);
    stream.on("end", ()=>{
        if (options.onComplete) options.onComplete(stream.result);
    });
    return stream;
}
