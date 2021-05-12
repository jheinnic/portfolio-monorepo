"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class BindingWhenOnGrandChildSyntax extends index_1.BindingWhenGrandChildSyntax {
    constructor(grandChildBuilder, generationDistance) {
        super(grandChildBuilder, generationDistance);
    }
    onActivation(_fn) {
        return this;
    }
}
exports.BindingWhenOnGrandChildSyntax = BindingWhenOnGrandChildSyntax;
