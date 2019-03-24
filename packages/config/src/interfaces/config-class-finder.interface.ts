import { Observable } from 'rxjs';
import { Provider, Type } from '@nestjs/common';

export interface IConfigClassFinder
{
   loadConfigAsync(): Observable<Exclude<Provider, Type<any>>>;

   loadConfigSync(): Observable<Exclude<Provider, Type<any>>>;
}
