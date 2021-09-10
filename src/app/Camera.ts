import Vector from "./Vector";

export default class Camera {
  private _position: Vector = new Vector();

  public set position(position: Vector) {
    this._position = position;
  }

  public get position(): Vector {
    return this._position;
  }
}
