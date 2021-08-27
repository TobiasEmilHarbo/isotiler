import Trait from "./Trait";

export default abstract class Turn extends Trait {
  protected activated: boolean;
  protected turningSpeed: number;

  constructor(turningSpeed: number, protected turnInPlace: boolean = true) {
    super();
    this.turningSpeed = turningSpeed / 10;
  }

  public activate(): void {
    this.activated = true;
  }

  public deactivate(): void {
    this.activated = false;
  }
}
