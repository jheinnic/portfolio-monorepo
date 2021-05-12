"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoOpBindingOn {
    constructor(parentBuilder) {
        this.parentBuilder = parentBuilder;
    }
    onActivation(_fn) {
        return this.parentBuilder;
    }
}
exports.NoOpBindingOn = NoOpBindingOn;
