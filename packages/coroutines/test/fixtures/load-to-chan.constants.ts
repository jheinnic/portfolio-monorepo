export namespace LoadToChan {
   export const loadConcurrency = 3;

   export const withoutDelayMs = 0;
   export const withDelayMs = 50;

   export const withBuffersCount = 2;

   export const realTimeDelta = 4;
   export const halfRealTimeDelta = 2;


   export enum StepType {
      advanceClock = 0,
      yieldFlow = 1,
      advanceThenYield = 2,
      yieldThenAdvance = 3,
      flushEvents = 4,
      checkNextCallCount = 5,
      readFromChan = 6
   };

   export interface AdvanceStep {
      readonly stepType: StepType.advanceClock;
      readonly tickTo: number;
   }

   export interface YieldStep {
      readonly stepType: StepType.yieldFlow;
   }

   export interface AdvanceYieldStep {
      readonly stepType: StepType.advanceThenYield;
      readonly tickTo: number;
   }

   export interface YieldAdvanceStep {
      readonly stepType: StepType.yieldThenAdvance;
      readonly tickTo: number;
   }

   export interface FlushEventsStep {
      readonly stepType: StepType.flushEvents;
   }

   export interface CountNextCallsStep {
      readonly stepType: StepType.checkNextCallCount;
      readonly expectedCount: number
   }

   export interface ReadFromChanStep {
      readonly stepType: StepType.readFromChan;
      readonly expectedValue: number;
   }

   function advance(tickTo: number): AdvanceStep {
      return {
         stepType: StepType.advanceClock,
         tickTo
      };
   }

   function yieldFlow(): YieldStep {
      return { stepType: StepType.yieldFlow };
   }

   // function advanceYield(tickTo: number) {
   //    return {
   //       stepType: StepType.advanceThenYield,
   //       tickTo
   //    }
   // }
   //
   // function yieldAdvance(tickTo: number) {
   //    return {
   //       stepType: StepType.yieldThenAdvance,
   //       tickTo
   //    }
   // }

   // function flushEvents(): FlushEventsStep {
   //    return { stepType: StepType.flushEvents };
   // }

   function countNextCalls(expectedCount: number): CountNextCallsStep {
      return {
         stepType: StepType.checkNextCallCount,
         expectedCount
      };
   }

   function readFromChan(expectedValue: number): ReadFromChanStep {
      return {
         stepType: StepType.readFromChan,
         expectedValue
      };
   }

   export type ScriptStep =
      AdvanceStep
      | YieldStep
      | AdvanceYieldStep
      | YieldAdvanceStep
      | FlushEventsStep
      | CountNextCallsStep
      | ReadFromChanStep;

   export const noBufferWithDelayScript: ReadonlyArray<ScriptStep> = [
      countNextCalls(3),
      readFromChan(1),
      yieldFlow(),
      countNextCalls(3),
      advance(30),
      readFromChan(2),
      yieldFlow(),
      countNextCalls(3),
      advance(45),
      yieldFlow(),
      countNextCalls(3),
      advance(50),
      yieldFlow(),
      countNextCalls(4),
      advance(75),
      yieldFlow(),
      countNextCalls(4),
      advance(80),
      yieldFlow(),
      countNextCalls(5)
   ]
}