/// <reference file="../../typings/medium/index.d.ts">
// @ts-ignore
import {Chan, take} from 'medium';
import {Clock} from 'lolex';

import {LoadToChan} from '../fixtures/load-to-chan.constants';
import * as Sinon from 'sinon';

export class LoadToChanScriptDirector {
   constructor(
      private readonly expect: Chai.ExpectStatic,
      private readonly clock: Clock,
      private readonly spiedUponIteratorNext: Sinon.SinonSpy,
      private readonly retChan: Chan<number, any>) { }

   async runScript( script: ReadonlyArray<LoadToChan.ScriptStep>): Promise<void>
   {
      let nextStep: LoadToChan.ScriptStep;
      for (nextStep of script) {
         // console.log('This step is', nextStep);
         switch(nextStep.stepType) {
            case LoadToChan.StepType.advanceClock: {
               // console.log('Advance Clock', nextStep.tickTo);
               this.clock.tick(nextStep.tickTo - this.clock.now);
               break;
            }
            case LoadToChan.StepType.yieldFlow: {
               // const before = Date.now();
               await yieldFlow();
               // console.log('Yield Flow from', before, 'to', Date.now());
               break;
            }
            case LoadToChan.StepType.flushEvents: {
               // console.log('Flush events with runAll');
               this.clock.runAll();
               break;
            }
            case LoadToChan.StepType.checkNextCallCount:
            {
               // console.log('Check next call count', nextStep.expectedCount);
               this.expect(this.spiedUponIteratorNext)
                  .to.have.callCount(nextStep.expectedCount);
               break;
            }
            case LoadToChan.StepType.readFromChan:
            {
               // console.log('Read from chan:', nextStep.expectedValue);
               this.expect(
                  await take(this.retChan)
               ).to.be.equal(nextStep.expectedValue);
               break;
            }
         }

         // console.log('...to next step...');
      }

      console.log('Out of steps');
   }
}

export function yieldFlow(): Promise<void> {
   return new Promise((resolve) => {
      process.nextTick(resolve)
   });
}
