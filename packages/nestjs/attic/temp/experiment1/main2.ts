import {Blender, Lamp, Socket} from './power_classes';
import {ConnectablePart, UtilityContainer} from './classes';

const s: Socket = new Socket();
const uc: UtilityContainer<Socket> = new UtilityContainer<Socket>(
  s,
  new Map<string, ConnectablePart<Socket>>(),
);
const b: Blender = new Blender(uc);
const l: Lamp = new Lamp(uc);
console.log(`Lamp power = ${l.hasPower()}; Blender power = ${b.hasPower()}`);
uc.connect('lamp');
uc.connect('blender');
console.log(`Lamp power = ${l.hasPower()}; Blender power = ${b.hasPower()}`);
