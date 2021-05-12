"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const simplytyped_1 = require("simplytyped");
function spyOn(base, sandbox = sinon_1.default) {
    for (let propName of simplytyped_1.objectKeys(base)) {
        if (typeof base[propName] == 'function') {
            sandbox.spy(base, propName);
        }
    }
    return base;
}
exports.spyOn = spyOn;
