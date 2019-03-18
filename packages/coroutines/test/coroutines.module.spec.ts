import { Test, TestingModule } from '@nestjs/testing';
import { CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN, CoroutinesModule } from '@jchptf/coroutines';
import { IConcurrentWorkFactory } from '@jchptf/coroutines';
import { expect } from 'chai';

describe('CoroutinesModule', () => {
   let sutModule: TestingModule;
   let concurrentWorkFactory: IConcurrentWorkFactory;

   beforeEach(async () => {
      sutModule = await Test.createTestingModule({
         imports: [CoroutinesModule],
      }).compile();

      concurrentWorkFactory = sutModule.get(CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN);
   });

   it('should be importable', () => {
      expect(sutModule).to.not.be.undefined;
   });

   it('should export an IConcurrentWorkFactory singleton', () => {
      expect(concurrentWorkFactory).to.not.be.undefined;
   });
});
