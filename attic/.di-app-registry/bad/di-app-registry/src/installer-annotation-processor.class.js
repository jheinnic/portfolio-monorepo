"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var InstallerAnnotationProcessor_1;
"use strict";
const inversify_1 = require("inversify");
const simplytyped_1 = require("simplytyped");
const metadata_1 = require("@loopback/metadata");
const paths_1 = require("@thi.ng/paths");
const decorators_1 = require("./decorators");
let InstallerAnnotationProcessor = InstallerAnnotationProcessor_1 = class InstallerAnnotationProcessor {
    constructor() { }
    scanForImportDecorators(inputMessage) {
        console.log(`Annotation scanner received ${inputMessage}`);
        const hasClassAnnotation = metadata_1.MetadataInspector.getClassMetadata(decorators_1.INSTALLER_REQUEST_KEY, inputMessage.constructor);
        if (!hasClassAnnotation) {
            return InstallerAnnotationProcessor_1.noOp;
        }
        const matches = Object.keys(inputMessage)
            .map((propKey) => {
            const meta = metadata_1.MetadataInspector.getPropertyMetadata(decorators_1.REQUIRED_IMPORT_KEY, inputMessage.constructor.prototype, propKey, { ownMetadataOnly: true });
            if ((!meta) || (!simplytyped_1.isKeyOf(inputMessage, propKey))) {
                return undefined;
            }
            const value = inputMessage[propKey];
            if (!value) {
                console.warn(`No value given for ${propKey}, therefore presuming there is already a container binding for ${meta}`);
                return undefined;
            }
            return {
                propKey,
                meta,
                value
            };
        })
            .filter(x => !!x);
        return (bind) => {
            for (let nextMatch of matches) {
                const { propKey, meta, value } = nextMatch;
                const inWhenOn = bind.bind(meta.serviceIdentifier)
                    .toDynamicValue(value);
                let whenOn;
                switch (meta.bindingScope) {
                    case 'Singleton':
                        {
                            whenOn = inWhenOn.inSingletonScope();
                            break;
                        }
                    case 'Transient':
                        {
                            whenOn = inWhenOn.inTransientScope();
                            break;
                        }
                    case 'Request':
                        {
                            whenOn = inWhenOn.inRequestScope();
                            break;
                        }
                }
                switch (meta.discriminator.type) {
                    case 'tagged':
                        {
                            whenOn.whenTargetTagged(meta.discriminator.key, meta.discriminator.value);
                            break;
                        }
                    case 'named':
                        {
                            whenOn.whenTargetNamed(meta.discriminator.name);
                            break;
                        }
                    case 'fromRequest':
                        {
                            const getPath = paths_1.getter(meta.discriminator.path);
                            const director = getPath(inputMessage);
                            if (!!director) {
                                director(whenOn);
                            }
                            else {
                                console.warn(`Could not correctly bind import for ${inputMessage} on ${propKey.toString()} due to ${meta.discriminator.path.toString()} not found`);
                            }
                            break;
                        }
                    case 'multiBound':
                    case 'none':
                        {
                            break;
                        }
                    default: { /* never */ }
                }
            }
        };
    }
    scanForExportDecorators(responseMessage) {
        console.log(`Annotation scanner received ${responseMessage}`);
        const hasClassAnnotation = metadata_1.MetadataInspector.getClassMetadata(decorators_1.INSTALLER_RESPONSE_KEY, responseMessage.constructor);
        if (!hasClassAnnotation) {
            return InstallerAnnotationProcessor_1.noOp;
        }
        return InstallerAnnotationProcessor_1.noOp;
    }
};
InstallerAnnotationProcessor.noOp = function () { };
InstallerAnnotationProcessor = InstallerAnnotationProcessor_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], InstallerAnnotationProcessor);
exports.InstallerAnnotationProcessor = InstallerAnnotationProcessor;
