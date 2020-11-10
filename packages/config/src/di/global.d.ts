import { GLOBAL_MODULE_ID, MODULE_ID } from '@jchptf/nestjs';

export module '@jchptf/nestjs'
{
   export interface IGlobalModule
   {
      [MODULE_ID]: typeof GLOBAL_MODULE_ID;
      [CONFIG_METADATA_HELPER]: IConfigMetadataHelper;
      [CONFIG_READER]: IConfigReader;
      [CONFIG_LOADER]: IConfigLoader;
      [DOTENV_CONFIG_OPTIONS]: DotenvConfigOptions;
   };

   export * from '@jchptf/nestjs';
}
