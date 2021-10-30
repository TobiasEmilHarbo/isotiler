import { Drawable } from "./library/Drawable";
import Vector from "./Vector";

export class Path implements Drawable {
  private breadCrumps = Array<Vector>();

  public add(...breadCrumps: Vector[]) {
    this.breadCrumps.push(...breadCrumps);
  }

  public draw(context: CanvasRenderingContext2D): void {
    for (let index = 0; index < this.breadCrumps.length; index++) {
      const pointA = this.breadCrumps[index];
      const pointB = this.breadCrumps[index + 1];

      pointA.draw(context);

      if (!pointB) continue;

      context.moveTo(pointA.x, pointA.y);
      context.lineTo(pointB.x, pointB.y);
      context.closePath();

      context.stroke();
    }
  }
}
