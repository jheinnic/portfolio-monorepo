export class Box {
	private readonly things: Thing[];
	private numStored = 0;

	constructor(private readonly size: number) {
		this.things = new Array<Thing>(size);
	}

	addThing(thing: Thing) {
		let retVal = false;
		if (this.numStored < this.size) {
			this.things[this.numStored++] = thing;
			retVal = true;
		}

		return retVal;
	}

	clone(): Box {
		return Object.assign({
       '__proto__': this.constructor.prototype
		}, this);
	}
}

export class Thing {
	public readonly hasParent: boolean;

	constructor(public readonly box: Box, public readonly f: number, public s: string) {
		this.hasParent = box.addThing(this);
	}

	public clone(): Thing {
		return Object.assign({
			'__proto__': this.constructor.prototype
		}, this);
	}
}


			
