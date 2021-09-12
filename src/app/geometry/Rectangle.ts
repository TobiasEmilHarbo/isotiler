import Vector from "../Vector";
import { Quadrilateral } from "./Quadrilateral";

export default class Rectangle extends Quadrilateral {
  constructor(width: number, height: number) {
    super(
      new Vector(),
      new Vector(width),
      new Vector(width, height),
      new Vector(0, height)
    );
  }
}
