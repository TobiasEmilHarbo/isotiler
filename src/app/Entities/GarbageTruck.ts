import Vector from "../Vector";
import Entity from "../Entity";
import { Direction } from "../library/Direction";
import SpriteSheet from "../SpriteSheet";

export default class GarbageTruck extends Entity {
  constructor(spriteSheet: SpriteSheet) {
    super(spriteSheet);

    spriteSheet.define("N", 90, 8, 19, 27, new Vector(10, 16));
    spriteSheet.define("NW", 42, 5, 35, 30, new Vector(17, 19));
    spriteSheet.define("W", 4, 6, 32, 29, new Vector(15, 18));
    spriteSheet.define("SW", 123, 45, 34, 32, new Vector(17, 18));
    spriteSheet.define("S", 90, 46, 19, 30, new Vector(10, 17));
    spriteSheet.define("SE", 42, 43, 35, 33, new Vector(18, 20));
    spriteSheet.define("E", 3, 47, 33, 28, new Vector(17, 17));
    spriteSheet.define("NE", 122, 6, 35, 30, new Vector(18, 18));

    this.velocity = new Vector(2, 1);
  }

  public update(): void {
    this.velocity = this.velocity.rotate(3);
    this.heading = this.velocity;

    // console.log("velocity: ", this.velocity.toString());
    // console.log("heading: ", this.heading.toString());

    this.currentSprite = this.spriteSheet.get(this.getHeading());

    this.getPosition().add(this.velocity);
  }

  public setVelocity(velocity: Vector): void {
    this.velocity = velocity;
  }

  private getHeading(): Direction {
    const north = new Vector(0, -1);
    const angle = this.heading.angleBetween(north);

    const OFFSET = 22.5;

    if (OFFSET + 45 * 0 < angle && angle <= OFFSET + 45 * 1) {
      return Direction.NORTH_EAST;
    }
    if (OFFSET + 45 * 1 < angle && angle <= OFFSET + 45 * 2) {
      return Direction.EAST;
    }
    if (OFFSET + 45 * 2 < angle && angle <= OFFSET + 45 * 3) {
      return Direction.SOUTH_EAST;
    }
    if (OFFSET + 45 * 3 < angle && angle <= OFFSET + 45 * 4) {
      return Direction.SOUTH;
    }
    if (OFFSET + 45 * 4 < angle && angle <= OFFSET + 45 * 5) {
      return Direction.SOUTH_WEST;
    }
    if (OFFSET + 45 * 5 < angle && angle <= OFFSET + 45 * 6) {
      return Direction.WEST;
    }
    if (OFFSET + 45 * 6 < angle && angle <= OFFSET + 45 * 7) {
      return Direction.NORTH_WEST;
    }

    return Direction.NORTH;
  }
}
