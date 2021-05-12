"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
function nestedContainerExportMiddleware(planAndResolve) {
    return (args) => {
        console.log('NextArgs:', util.inspect(args, true, 15, true));
        let nextContextInterceptor = args.contextInterceptor;
        args.contextInterceptor = (context) => {
            console.log('Context:', util.inspect(context, true, 15, true));
            return nextContextInterceptor(context);
        };
        return planAndResolve(args);
    };
}
exports.nestedContainerExportMiddleware = nestedContainerExportMiddleware;
