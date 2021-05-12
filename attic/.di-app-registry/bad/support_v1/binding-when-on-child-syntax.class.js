"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class BindingWhenOnChildSyntax extends index_1.BindingWhenChildSyntax {
    constructor(childBuilder) {
        super(childBuilder);
    }
    onActivation(_fn) {
        return this;
    }
}
exports.BindingWhenOnChildSyntax = BindingWhenOnChildSyntax;
