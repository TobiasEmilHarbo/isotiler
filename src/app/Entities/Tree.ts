import SpriteSheet from "../sprites/SpriteSheet";
import Vector from "../Vector";
import Entity from "./Entity";
import Circle from "../geometry/Circle";

export class Tree extends Entity {
  constructor(spriteSheet: SpriteSheet, entities: Array<Entity>) {
    super(spriteSheet, entities);

    spriteSheet.define("tree", 2, 1, 96, 106, new Vector(50, 93));

    this.sprite = this.spriteSheet.get("tree");
    this._hitBox = new Circle(this.position, 16);
  }
}
