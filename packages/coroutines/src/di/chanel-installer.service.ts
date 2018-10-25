import {injectable, interfaces} from 'inversify';
import {chanel, Chanel} from 'chanel';

import {IContainerRegistryInstallerClient, InstallerService} from '@jchptf/di-app-registry';
import {InstallChanelRequest} from './install-chanel-request.class';
import {CO_TYPES} from './types';

@injectable()
export class ChanelInstaller implements InstallerService<InstallChanelRequest<any>, void>
{
   install<T extends any>(client: IContainerRegistryInstallerClient, request: InstallChanelRequest<T>)
   {
      switch(request.scope) {
         case "Singleton":
         {
            client.load(
               (bind: interfaces.Bind) => {
                  request.bindWhen(
                     bind<Chanel<T>>(CO_TYPES.Chanel)
                        .toDynamicValue((_context: interfaces.Context) => {
                           return chanel(request.chanelOptions);
                        })
                        .inSingletonScope()
                  )
               }
            );

            break;
         }
         case "Transient":
         {
            client.load(
               (bind: interfaces.Bind) => {
                  request.bindWhen(
                     bind<Chanel<T>>(CO_TYPES.Chanel)
                        .toDynamicValue((_context: interfaces.Context) => {
                           return chanel(request.chanelOptions);
                        })
                        .inTransientScope()
                  );
               }
            );

            break;
         }
         case "Request":
         {
            client.load(
               (bind: interfaces.Bind) => {
                  request.bindWhen(
                     bind<Chanel<T>>(CO_TYPES.Chanel)
                        .toDynamicValue((_context: interfaces.Context) => {
                           return chanel(request.chanelOptions);
                        })
                        .inRequestScope()
                  )
               }
            );

            break;
         }
      }
   }
}