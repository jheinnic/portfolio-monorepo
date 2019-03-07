export let multiTwiddleDee = 0;

export function multiSyncTwiddle(_a: number, _b: number): Promise<void>|void {
   const retVal = _a + _b;
   if ((retVal % 2) === 1) {
      multiTwiddleDee = -1 * retVal;
      return Promise.resolve();
   }

   multiTwiddleDee = retVal;
   return;
}
