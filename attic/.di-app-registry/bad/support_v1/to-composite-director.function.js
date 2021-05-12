"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const composite_binding_class_1 = require("./composite-binding.class");
function toCompositeDirector(parentDirector, hostDirector) {
    return (hostBuilder) => {
        const compositeHelper = new composite_binding_class_1.CompositeBinding(hostBuilder);
        compositeHelper.apply((builder) => {
            builder.bindHost(hostDirector)
                .bindParent(parentDirector);
        });
    };
}
exports.toCompositeDirector = toCompositeDirector;
