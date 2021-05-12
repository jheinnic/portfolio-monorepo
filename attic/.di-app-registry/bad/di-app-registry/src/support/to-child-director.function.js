"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binding_when_on_child_syntax_class_1 = require("./binding-when-on-child-syntax.class");
function toChildDirector(parentDirector) {
    return (childBuilder) => {
        const parentBuilder = new binding_when_on_child_syntax_class_1.BindingWhenOnChildSyntax(childBuilder);
        parentDirector(parentBuilder);
    };
}
exports.toChildDirector = toChildDirector;
