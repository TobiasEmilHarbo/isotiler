import Vector from "../Vector";
import KeyboardControl, { KEYS, KEY_STATES } from "../Inputs/KeyboardControl";
import Entity from "./Entity";
import { Direction } from "../library/Direction";
import SpriteSheet from "../sprites/SpriteSheet";
import Head from "../Traits/Head";
import TurnLeft from "../Traits/TurnLeft";
import TurnRight from "../Traits/TurnRight";
import MoveBackward from "../Traits/MoveBackward";
import MoveForward from "../Traits/MoveForward";
import Drag from "../Traits/Drag";
import Break from "../Traits/Break";
import Velocity from "../Traits/Velocity";
import Circle from "../geometry/Circle";
import RigidBody from "../Traits/RigidBody";
import TileGrid from "../tiles/TileGrid";

export default class RedSedan extends Entity {
  constructor(
    spriteSheet: SpriteSheet,
    tileGrid: TileGrid,
    entities: Array<Entity>
  ) {
    super(spriteSheet, tileGrid, entities);

    spriteSheet.define("N", 90, 8, 19, 27, new Vector(10, 16));
    spriteSheet.define("NW", 42, 5, 35, 30, new Vector(17, 19));
    spriteSheet.define("W", 4, 6, 32, 29, new Vector(15, 18));
    spriteSheet.define("SW", 123, 45, 34, 32, new Vector(17, 18));
    spriteSheet.define("S", 90, 46, 19, 30, new Vector(10, 17));
    spriteSheet.define("SE", 42, 43, 35, 33, new Vector(18, 20));
    spriteSheet.define("E", 3, 47, 33, 28, new Vector(17, 17));
    spriteSheet.define("NE", 122, 6, 35, 30, new Vector(18, 18));

    this.heading = Vector.WEST;
    this._hitBox = new Circle(this.position, 12);
    this.sprite = this.spriteSheet.get(Direction.WEST);

    const moveBackwardsTrait = new MoveBackward(100, 300);
    const moveForwardsTrait = new MoveForward(175, 400);
    const turnLeftTrait = new TurnLeft(900, false);
    const turnRightTrait = new TurnRight(900, false);
    const breakTrait = new Break(400);

    const keyboard = new KeyboardControl(false);

    keyboard.addKeyMapping(KEYS.W, {
      [KEY_STATES.PRESSED]: () => moveForwardsTrait.activate(),
      [KEY_STATES.RELEASED]: () => moveForwardsTrait.deactivate(),
    });

    keyboard.addKeyMapping(KEYS.S, {
      [KEY_STATES.PRESSED]: () => moveBackwardsTrait.activate(),
      [KEY_STATES.RELEASED]: () => moveBackwardsTrait.deactivate(),
    });

    keyboard.addKeyMapping(KEYS.A, {
      [KEY_STATES.PRESSED]: () => turnLeftTrait.activate(),
      [KEY_STATES.RELEASED]: () => turnLeftTrait.deactivate(),
    });

    keyboard.addKeyMapping(KEYS.D, {
      [KEY_STATES.PRESSED]: () => turnRightTrait.activate(),
      [KEY_STATES.RELEASED]: () => turnRightTrait.deactivate(),
    });

    keyboard.addKeyMapping(KEYS.SPACE, {
      [KEY_STATES.PRESSED]: () => breakTrait.activate(),
      [KEY_STATES.RELEASED]: () => breakTrait.deactivate(),
    });

    this.addTrait(moveForwardsTrait);
    this.addTrait(moveBackwardsTrait);
    this.addTrait(turnRightTrait);
    this.addTrait(turnLeftTrait);
    this.addTrait(new Head());
    this.addTrait(breakTrait);
    this.addTrait(new Drag(100));
    this.addTrait(new Velocity());
    this.addTrait(new RigidBody(entities));
  }
}
