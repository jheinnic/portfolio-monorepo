import {injectable, interfaces} from 'inversify';

import {MERKLE_TYPES} from '../../../packages/merkle/src/di/types';
import {IContainerRegistryInstallerClient, InstallerService} from '@jchptf/di-app-registry';
import {InstallMerkleTreeRequest} from './install-factories-request.class';
import {IMerkleCalculator} from '../interfaces';
import {ConcurrentWorkFactory} from '../services';

@injectable()
export class FactoriesInstaller implements InstallerService<InstallFactoriesRequest, void>
{
   install(client: IContainerRegistryInstallerClient, request: InstallFactoriesRequest)
   {
      client.load(
         (bind: interfaces.Bind) => {
            request.bindWhen(
               bind<IConcurrentWorkFactory>(CO_TYPES.ConcurrentWorkFactory)
                  .to(ConcurrentWorkFactory)
                  .inSingletonScope()
            )
         }
      );
   }
}