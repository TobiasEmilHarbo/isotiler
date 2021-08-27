import Entity from "../Entities/Entity";
import Vector from "../Vector";
import Trait from "./Trait";

export default abstract class Move extends Trait {
  protected activated: boolean = false;
  protected acceleration: number;
  protected maxVelocity: number;

  constructor(maxVelocity: number, acceleration: number) {
    super();
    this.maxVelocity = maxVelocity / 100;
    this.acceleration = acceleration / 100;
  }

  protected slowDown(entity: Entity, deltaTime: number) {
    const dragCoefficient = this.acceleration * deltaTime;

    const currentSpeed = entity.velocity.magnitude();

    const newSpeed = currentSpeed - dragCoefficient;

    if (newSpeed <= 0) {
      entity.velocity = new Vector();
      return;
    }

    const newVelocity = entity.velocity.setLength(newSpeed);

    entity.velocity = newVelocity;
  }

  public activate(): void {
    this.activated = true;
  }

  public deactivate(): void {
    this.activated = false;
  }
}
