import Entity from "../Entities/Entity";
import Drag from "./Drag";

export default class Brake extends Drag {
  private activated: boolean;

  constructor(breakForce: number) {
    super(breakForce);
  }

  public update(entity: Entity, deltaTime: number): void {
    if (!this.activated) return;
    super.update(entity, deltaTime);
  }

  public activate(): void {
    this.activated = true;
  }

  public deactivate(): void {
    this.activated = false;
  }
}
