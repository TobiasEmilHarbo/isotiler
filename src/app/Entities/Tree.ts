import SpriteSheet from "../SpriteSheet";
import KeyboardControl from "../KeyboardControl";
import Vector from "../Vector";
import Entity from "./Entity";

export class Tree extends Entity {
  private radius: number = 16;

  constructor(spriteSheet: SpriteSheet) {
    super(spriteSheet);

    spriteSheet.define("tree", 2, 1, 96, 106, new Vector(50, 93));

    this.sprite = this.spriteSheet.get("tree");
  }

  public draw(context: CanvasRenderingContext2D) {
    super.draw(context);

    // context.strokeStyle = "red";
    // context.beginPath();
    // context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    // context.closePath();
    // context.stroke();
  }

  public update(deltaTime: number): void {}
}
