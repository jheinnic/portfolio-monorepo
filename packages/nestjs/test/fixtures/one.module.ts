import { Module } from '@nestjs/common';
import { REGISTRY } from '@jchptf/nestjs';
import {A_STRING_TOKEN, B_SYMBOL_TOKEN, A_SUBJECT, B_SUBJECT} from "./names.constants";

export class OneModuleRegistry {
   [REGISTRY] = OneModuleRegistry;
   [A_STRING_TOKEN] = A_SUBJECT;
   [B_SYMBOL_TOKEN] = B_SUBJECT;
}

@Module({
   providers: [
      {
         provide: A_STRING_TOKEN,
         useValue: A_SUBJECT
      },
      {
         provide: B_SYMBOL_TOKEN,
         useValue: B_SUBJECT
      }
   ],
})
export class OneModule
{
   [REGISTRY] = OneModuleRegistry;
}
