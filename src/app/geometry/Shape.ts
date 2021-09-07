import { Drawable } from "../library/Drawable";
import Vector from "../Vector";

export default interface Shape extends Drawable {
  setPosition(position: Vector): void;
  getPosition(): Vector;
}
