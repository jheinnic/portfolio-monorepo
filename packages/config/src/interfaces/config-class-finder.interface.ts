import {Observable} from 'rxjs';
import {Provider} from '@nestjs/common';

export interface IConfigClassFinder
{
   loadConfigAsync(): Observable<Provider>

   loadConfigSync(): Observable<Provider>
}
