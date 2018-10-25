import {interfaces} from 'inversify';

import {IDirector} from '@jchptf/api';
import {installerRequest} from '@jchptf/di-app-registry';
import {IConcurrentWorkFactory} from '../interfaces';

@installerRequest()
export class InstallFactoriesRequest
{
   bindWhen: IDirector<interfaces.BindingWhenSyntax<IConcurrentWorkFactory>>;

   constructor(
      bindWhen: IDirector<interfaces.BindingWhenSyntax<IConcurrentWorkFactory>>)
   {
      this.bindWhen = bindWhen;
   }
}
