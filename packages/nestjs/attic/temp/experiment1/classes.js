"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const power_classes_1 = require("./power_classes");
let Dynamo = class Dynamo {
    constructor() {
        this.value = Math.random();
    }
};
Dynamo = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], Dynamo);
exports.Dynamo = Dynamo;
let UtilityContainer = class UtilityContainer {
    constructor(proto, nameMap) {
        this.proto = proto;
        this.nameMap = nameMap;
    }
    getProto() {
        return this.proto;
    }
    register(name, part) {
        this.nameMap.set(name, part);
    }
    connect(name) {
        const part = this.nameMap.get(name);
        this.proto.connect(part);
    }
};
UtilityContainer = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, common_1.Inject(constants_1.INJECTED_DEPENDENCY)),
    tslib_1.__param(1, common_1.Inject(constants_1.LOCAL_DEPENDENCY)),
    tslib_1.__metadata("design:paramtypes", [Object, Map])
], UtilityContainer);
exports.UtilityContainer = UtilityContainer;
let Application = class Application {
    constructor(power, blender, lamp) {
        this.power = power;
        this.blender = blender;
        this.lamp = lamp;
    }
    start() {
        console.log(`Lamp power = ${this.lamp.hasPower()}; Blender power = ${this.blender.hasPower()}`);
        this.power.connect('lamp');
        console.log(`Lamp power = ${this.lamp.hasPower()}; Blender power = ${this.blender.hasPower()}`);
        this.power.connect('blender');
        console.log(`Lamp power = ${this.lamp.hasPower()}; Blender power = ${this.blender.hasPower()}`);
    }
};
Application = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, common_1.Inject(constants_1.POWER_CONTAINER)),
    tslib_1.__param(1, common_1.Inject(constants_1.BLENDER)),
    tslib_1.__param(2, common_1.Inject(constants_1.LAMP)),
    tslib_1.__metadata("design:paramtypes", [UtilityContainer,
        power_classes_1.Blender,
        power_classes_1.Lamp])
], Application);
exports.Application = Application;
//# sourceMappingURL=classes.js.map