export interface ITopoOrderBuilder {
   leftToRight(value: boolean): ITopoOrderBuilder;
   breadthFirst(value: boolean): ITopoOrderBuilder;
   onlyVisitUsed(value: boolean): ITopoOrderBuilder;
}

