import {injectable, interfaces} from 'inversify';
import {chan, Chan} from 'chan';

import {CO_TYPES} from './types';
import {InstallChanRequest} from './install-chan-request.class';
import {IContainerRegistryInstallerClient, InstallerService} from '@jchptf/di-app-registry';

@injectable()
export class ChanInstaller implements InstallerService<InstallChanRequest<any>, void>
{
   install<T>(client: IContainerRegistryInstallerClient, request: InstallChanRequest<T>)
   {
      switch(request.scope) {
         case "Singleton":
         {
            client.load(
               (bind: interfaces.Bind) => {
                  request.bindWhen(
                     bind<Chan<T>>(CO_TYPES.Chan)
                        .toDynamicValue((_context: interfaces.Context) => {
                           return chan(request.bufSize);
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
                     bind<Chan<T>>(CO_TYPES.Chan)
                        .toDynamicValue((_context: interfaces.Context) => {
                           return chan(request.bufSize);
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
                     bind<Chan<T>>(CO_TYPES.Chan)
                        .toDynamicValue((_context: interfaces.Context) => {
                           return chan(request.bufSize);
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