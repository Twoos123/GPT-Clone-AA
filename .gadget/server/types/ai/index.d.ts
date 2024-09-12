import { Readable, type ReadableOptions } from "stream";
declare class OpenAIResponseStream extends Readable {
    readonly openAIIterable: AsyncIterable<any>;
    reading: boolean;
    result: string;
    responseContentType: string;
    constructor(openAIIterable: AsyncIterable<any>, options: ReadableOptions = {});
    processChunk(): (chunk: any) => string | undefined;
    async _read();
}
export interface OpenAIResponseStreamOptions {
    onComplete?: (content: string) => void;
}
export declare function openAIResponseStream(openAIIterable: AsyncIterable<any>, options?: OpenAIResponseStreamOptions): Readable;
