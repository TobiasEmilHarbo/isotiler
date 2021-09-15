import Entity from "../Entities/Entity";
import Turn from "./Turn";

export default class TurnLeft extends Turn {
  public update(entity: Entity, deltaTime: number): void {
    if (!this.activated) return;
    if (!this.turnInPlace && entity.velocity.magnitude == 0) return;

    const angleOfHeading = entity.velocity.angleBetween(entity.heading);
    const reversing = angleOfHeading <= 270 && 90 <= angleOfHeading;

    const speed = entity.velocity.magnitude;

    const turn = reversing ? this.turningSpeed : -this.turningSpeed;

    entity.heading = entity.heading.rotate(turn * speed * deltaTime);
  }
}
