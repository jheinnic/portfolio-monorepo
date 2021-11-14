"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var BarModule_1;
"use strict";
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const classes_1 = require("./classes");
const power_classes_1 = require("./power_classes");
class DynamicsModule {
    static forFeature(dependency, exportAs, selfMod) {
        return {
            module: DynamicsModule,
            imports: [
                {
                    module: selfMod,
                    providers: [
                        {
                            provide: constants_1.INJECTED_DEPENDENCY,
                            useFactory: obj => obj,
                            inject: [dependency],
                        },
                    ],
                    exports: [constants_1.INJECTED_DEPENDENCY],
                },
            ],
            providers: [
                {
                    provide: constants_1.LIBRARY_CLASS,
                    useClass: classes_1.UtilityContainer,
                },
                {
                    provide: constants_1.LOCAL_DEPENDENCY,
                    useFactory: () => { return new Map(); },
                },
                {
                    provide: exportAs,
                    useFactory: obj => obj,
                    inject: [constants_1.LIBRARY_CLASS],
                },
            ],
            exports: [exportAs],
        };
    }
}
exports.DynamicsModule = DynamicsModule;
/*
@Module({
   imports: [DynamicsModule.forFeature(APPLE, FRUIT_CONTAINER, FooModule)],
   providers: [
      {
         provide: APPLE,
         useClass: Apple,
      }, {
         provide: ORANGE,
         useClass: Orange,
      },
   ],
   exports: [ORANGE, APPLE],
})
export class FooModule
{}
*/
let BarModule = BarModule_1 = class BarModule {
};
BarModule = BarModule_1 = tslib_1.__decorate([
    common_1.Module({
        imports: [DynamicsModule.forFeature(constants_1.SOCKET, constants_1.POWER_CONTAINER, BarModule_1)],
        providers: [
            {
                provide: constants_1.SOCKET,
                useClass: power_classes_1.Socket,
            }, {
                provide: constants_1.BLENDER,
                useClass: power_classes_1.Blender,
            }, {
                provide: constants_1.LAMP,
                useClass: power_classes_1.Lamp,
            },
        ],
        exports: [constants_1.SOCKET, constants_1.BLENDER, constants_1.LAMP, DynamicsModule],
    })
], BarModule);
exports.BarModule = BarModule;
let ApplicationModule = class ApplicationModule {
};
ApplicationModule = tslib_1.__decorate([
    common_1.Module({
        imports: [BarModule],
        providers: [classes_1.Application],
        exports: [classes_1.Application],
    })
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=modules.js.map