import { interfaces } from 'inversify';
export declare class InstallerAnnotationProcessor {
    constructor();
    private static readonly noOp;
    scanForImportDecorators(inputMessage: any): interfaces.ContainerModuleCallBack;
    scanForExportDecorators(responseMessage: any): interfaces.ContainerModuleCallBack;
}
