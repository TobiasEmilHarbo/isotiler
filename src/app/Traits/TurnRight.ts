import Entity from "../Entities/Entity";
import Turn from "./Turn";

export default class TurnRight extends Turn {
  public update(entity: Entity, deltaTime: number): void {
    if (!this.activated) return;
    if (!this.turnInPlace && entity.velocity.magnitude() == 0) return;

    const angleOffHeading = entity.velocity.angleBetween(entity.heading);

    const speed = entity.velocity.magnitude();

    const reversing = angleOffHeading <= 270 && 90 <= angleOffHeading;

    const turn = !reversing ? this.turningSpeed : -this.turningSpeed;
    entity.heading = entity.heading.rotate(turn * speed * deltaTime);
  }
}
