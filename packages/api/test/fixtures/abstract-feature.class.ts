export class AbstractFeature {
   constructor() {
      this.init();
   }

   protected init(): void {
      console.log('This is Abstract');
   }
}
