/**
 * Bag of key-values associated with the current actor running this request or action
 **/
export class Session {
  static fromInput(input?: Record<string, any>): Session | undefined {
    if (input) {
      return new Session(input.id, input);
    }
  }

  changedKeys: Set<string> = new Set<string>();
  ended = false;
  touched = false;
  #storage: Record<string, any>;

  constructor(private _id: string | null, obj: Record<string, any>) {
    this.#storage = obj;
  }

  get(key: string): any {
    return this.#storage[key];
  }

  set(key: string, value: any): void {
    this.changedKeys.add(key);
    this.#storage[key] = value;
  }

  touch(): void {
    this.touched = true;
  }

  delete(key: string): void {
    this.changedKeys.add(key);
    this.#storage[key] = null;
  }

  end(): void {
    this.changedKeys.add("id");
    this.ended = true;
  }

  clearChanges(): void {
    this.changedKeys.clear();
  }

  get changed(): boolean {
    return this.changedKeys.size > 0;
  }

  toJSON(): Record<string, any> {
    return this.#storage;
  }

  toChangedJSON(): Record<string, any> {
    const changes: Record<string, any> = {};
    for (const key of this.changedKeys) {
      changes[key] = this.#storage[key];
    }
    return changes;
  }

  get id() {
    return this._id;
  }

  set id(value: string | null) {
    this._id = value;
    this.set("id", this._id);
  }
}
