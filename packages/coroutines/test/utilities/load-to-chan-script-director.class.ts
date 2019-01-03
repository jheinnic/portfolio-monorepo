import {Clock} from 'lolex';
import {Chan, sleep, take} from 'medium';

import {LoadToChan} from '../fixtures/load-to-chan.constants';
import * as Sinon from 'sinon';

export class LoadToChanScriptDirector {
   constructor(
      private readonly expect: Chai.ExpectStatic,
      private readonly clock: Clock,
      private readonly realTimeDelta: number,
      private readonly spiedUponIteratorNext: Sinon.SinonSpy,
      private readonly retChan: Chan<number, any>) { }

   async runScript( script: ReadonlyArray<LoadToChan.ScriptStep>) {
      let nextStep: LoadToChan.ScriptStep;
      for (nextStep of script) {
         switch(nextStep.stepType) {
            case LoadToChan.StepType.advanceClock: {
               this.clock.tick(nextStep.tickTo - this.clock.now);
               break;
            }
            case LoadToChan.StepType.yieldFlow: {
               await sleep(this.realTimeDelta);
               break;
            }
            case LoadToChan.StepType.flushEvents: {
               this.clock.runAll();
               break;
            }
            case LoadToChan.StepType.checkNextCallCount:
            {
               this.expect(this.spiedUponIteratorNext)
                  .to.have.callCount(nextStep.expectedCount);
               break;
            }
            case LoadToChan.StepType.readFromChan:
            {
               this.expect(
                  await take(this.retChan)
               ).to.be.equal(nextStep.expectedValue);
               break;
            }
         }
      }
   }
}