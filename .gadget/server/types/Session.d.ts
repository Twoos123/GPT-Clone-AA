export declare class Session {
    static fromInput(input?: Record<string, any>): Session | undefined;
    changedKeys: Set<string>;
    ended: boolean;
    touched: boolean;
    constructor(private _id: string | null, obj: Record<string, any>);
    get(key: string): any;
    set(key: string, value: any): void;
    touch(): void;
    delete(key: string): void;
    end(): void;
    clearChanges(): void;
    get changed(): boolean;
    toJSON(): Record<string, any>;
    toChangedJSON(): Record<string, any>;
    get id();
    set id(value: string | null);
}
