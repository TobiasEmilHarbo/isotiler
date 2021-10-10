import Entity from "./Entities/Entity";
import KeyboardControl, { KEYS, KEY_STATES } from "./Inputs/KeyboardControl";
import Tile from "./tiles/Tile";
import Brake from "./Traits/Break";
import MoveForward from "./Traits/MoveForward";
import Vector from "./Vector";

export class VehicleController {
  private entity: Entity;
  private moveForward: MoveForward;
  private brake: Brake;
  private turningSpeed: number = 350;
  private journey = new Array<Vector>();
  private activated = false;

  private lastTile: Tile;

  private lastDistanceToDestination: number = Infinity;

  constructor() {
    this.moveForward = new MoveForward(110, 150);
    this.brake = new Brake(250);
    this.moveForward.activate();

    const keyboard = new KeyboardControl(true);

    keyboard.addKeyMapping(KEYS.SPACE, {
      [KEY_STATES.PRESSED]: () => (this.activated = !this.activated),
    });
  }

  public setEntity(entity: Entity): void {
    this.entity = entity;
  }

  public goTo(destination: Vector): void {
    this.journey.push(destination);
  }

  public update(deltaTime: number) {
    if (this.lastTile != this.entity.currentTile) {
      this.journey = this.entity.currentTile.getPath();
      this.lastTile = this.entity.currentTile;
    }

    this.brake.deactivate();
    const destination = this.journey[0];

    if (!destination || !this.activated) {
      this.brake.activate();
      this.brake.update(this.entity, deltaTime);
      return;
    }

    this.moveForward.update(this.entity, deltaTime);

    const toDestination = destination.subtract(this.entity.position);

    if (
      this.lastDistanceToDestination <= toDestination.magnitude &&
      toDestination.magnitude < 5
    ) {
      this.lastDistanceToDestination = Infinity;
      this.journey.shift();
      return;
    }

    const angleToTarget = this.entity.angleToTarget(toDestination);

    if (angleToTarget.equals(0)) {
      return;
    }

    const direction = Math.sign(angleToTarget);

    let correctionAngle =
      direction * deltaTime * this.turningSpeed * this.entity.speed;

    correctionAngle = Math.abs(correctionAngle).greaterThanOrEqualTo(
      Math.abs(angleToTarget)
    )
      ? angleToTarget
      : correctionAngle;

    this.entity.heading = this.entity.heading.rotate(correctionAngle);

    this.lastDistanceToDestination = toDestination.magnitude;
  }
}
