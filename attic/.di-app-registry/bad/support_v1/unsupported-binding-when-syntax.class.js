"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnsupportedBindingWhenSyntax {
    when(_constraint) {
        throw new Error('Unsupported Operation');
    }
    whenAnyAncestorIs(_ancestor) {
        throw new Error('Unsupported Operation');
    }
    whenAnyAncestorMatches(_constraint) {
        throw new Error('Unsupported Operation');
    }
    whenAnyAncestorNamed(_name) {
        throw new Error('Unsupported Operation');
    }
    whenAnyAncestorTagged(_tag, _value) {
        throw new Error('Unsupported Operation');
    }
    whenInjectedInto(_parent) {
        throw new Error('Unsupported Operation');
    }
    whenNoAncestorIs(_ancestor) {
        throw new Error('Unsupported Operation');
    }
    whenNoAncestorMatches(_constraint) {
        throw new Error('Unsupported Operation');
    }
    whenNoAncestorNamed(_name) {
        throw new Error('Unsupported Operation');
    }
    whenNoAncestorTagged(_tag, _value) {
        throw new Error('Unsupported Operation');
    }
    whenParentNamed(_name) {
        throw new Error('Unsupported Operation');
    }
    whenParentTagged(_tag, _value) {
        throw new Error('Unsupported Operation');
    }
    whenTargetIsDefault() {
        throw new Error('Unsupported Operation');
    }
    whenTargetNamed(_name) {
        throw new Error('Unsupported Operation');
    }
    whenTargetTagged(_tag, _value) {
        throw new Error('Unsupported Operation');
    }
}
exports.UnsupportedBindingWhenSyntax = UnsupportedBindingWhenSyntax;
