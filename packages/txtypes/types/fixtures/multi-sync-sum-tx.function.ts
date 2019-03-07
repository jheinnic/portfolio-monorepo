export function multiSyncSumTx(_a: number, _b: number): Promise<number>|number {
   const retVal: number = _a + _b;
   if ((retVal % 2) === 1) {
      return Promise.resolve(retVal);
   }

   return retVal;
}
