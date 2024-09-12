"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ai_exports = {};
__export(ai_exports, {
  openAIResponseStream: () => openAIResponseStream
});
module.exports = __toCommonJS(ai_exports);
var import_stream = require("stream");
class OpenAIResponseStream extends import_stream.Readable {
  constructor(openAIIterable, options = {}) {
    super(options);
    this.responseContentType = "application/octet-stream";
    this.openAIIterable = openAIIterable;
    this.reading = false;
    this.result = "";
  }
  processChunk() {
    let isFunctionStreaming;
    return (json) => {
      if (json.choices[0]?.delta?.function_call?.name) {
        isFunctionStreaming = true;
        return `{"function_call": {"name": "${json.choices[0]?.delta?.function_call.name}", "arguments": "`;
      }
      if (json.choices[0]?.delta?.function_call?.arguments) {
        const argumentChunk = json.choices[0].delta.function_call.arguments;
        const escapedPartialJson = argumentChunk.replace(/\\/g, "\\\\").replace(/\//g, "\\/").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\f/g, "\\f");
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
    if (this.reading)
      return;
    this.reading = true;
    const process = this.processChunk();
    try {
      for await (const part of this.openAIIterable) {
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
  stream.on("end", () => {
    if (options.onComplete)
      options.onComplete(stream.result);
  });
  return stream;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  openAIResponseStream
});
//# sourceMappingURL=index.js.map
