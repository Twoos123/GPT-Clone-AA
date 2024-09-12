/**
 * Bag of key-values associated with the current actor running this request or action
 **/ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Session", {
    enumerable: true,
    get: function() {
        return Session;
    }
});
class Session {
    _id;
    static fromInput(input) {
        if (input) {
            return new Session(input.id, input);
        }
    }
    changedKeys;
    ended;
    touched;
    #storage;
    constructor(_id, obj){
        this._id = _id;
        this.changedKeys = new Set();
        this.ended = false;
        this.touched = false;
        this.#storage = obj;
    }
    get(key) {
        return this.#storage[key];
    }
    set(key, value) {
        this.changedKeys.add(key);
        this.#storage[key] = value;
    }
    touch() {
        this.touched = true;
    }
    delete(key) {
        this.changedKeys.add(key);
        this.#storage[key] = null;
    }
    end() {
        this.changedKeys.add("id");
        this.ended = true;
    }
    clearChanges() {
        this.changedKeys.clear();
    }
    get changed() {
        return this.changedKeys.size > 0;
    }
    toJSON() {
        return this.#storage;
    }
    toChangedJSON() {
        const changes = {};
        for (const key of this.changedKeys){
            changes[key] = this.#storage[key];
        }
        return changes;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
        this.set("id", this._id);
    }
}
