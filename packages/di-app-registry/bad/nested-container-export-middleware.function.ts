import {interfaces} from 'inversify';
import * as util from 'util';

export function nestedContainerExportMiddleware(planAndResolve: interfaces.Next): interfaces.Next
{
   return (args: interfaces.NextArgs) => {
      console.log('NextArgs:', util.inspect(args, true, 15, true));
      let nextContextInterceptor = args.contextInterceptor;
      args.contextInterceptor = (context: interfaces.Context) => {
         console.log('Context:', util.inspect(context, true, 15, true));
         return nextContextInterceptor(context);
      };
      return planAndResolve(args);
   };
}