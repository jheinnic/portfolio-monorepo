
class Point {
    constructor(public x: number, public y: number) {}
}
class Person {
    constructor(public name: string) {}
}
type Constructor<T> = new (...args: any[]) => T;
function Tagged<T extends Constructor<{}>>(Base: T) {
    return class extends Base {
        _tag: string;
        constructor(...args: any[]) {
            super(...args);
            this._tag = "";
        }
    };
}
type Tagged = {
    _tag: string;
}
function isTagged(t: {}): t is Tagged {
    return Object.keys(t).includes('_tag');
}

const TaggedPoint = Tagged(Point);
let point = new TaggedPoint(10, 20);
point._tag = "hello";
class Customer extends Tagged(Person) {
    accountBalance: number = 3;
}
let customer = new Customer("Joe");
customer._tag = "test";
customer.accountBalance = 0;

if (customer instanceof Tagged) {
    console.log("Yes")
} else {
    console.log("No")
}
if (isTagged(point)) {
    console.log("Yes");
}
let t: Tagged = point;
t = customer;
console.log(t);
t = point;
console.log(t);

@Tagged
class Thing {
    foo: number = 0;
}

// t = new Thing()