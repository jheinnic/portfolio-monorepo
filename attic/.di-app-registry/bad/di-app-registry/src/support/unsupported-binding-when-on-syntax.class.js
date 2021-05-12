"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unsupported_binding_when_syntax_class_1 = require("./unsupported-binding-when-syntax.class");
class UnsupportedBindingWhenOnSyntax extends unsupported_binding_when_syntax_class_1.UnsupportedBindingWhenSyntax {
    onActivation(_fn) {
        throw new Error('Unsupported Operation');
    }
}
exports.UnsupportedBindingWhenOnSyntax = UnsupportedBindingWhenOnSyntax;
