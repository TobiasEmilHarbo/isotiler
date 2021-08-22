export default class Vector {
  constructor(
    private _x: number = 0,
    private _y: number = 0,
    private _z: number = 0
  ) {}

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public get z(): number {
    return this._z;
  }

  public add(vector: Vector) {
    this._x += vector.x;
    this._y += vector.y;
    this._z += vector.z;
  }

  public dot(other: Vector) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  public magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public rotate(degrees: number): Vector {
    const x =
      this.x * Math.cos((degrees * Math.PI) / 180) -
      this.y * Math.sin((degrees * Math.PI) / 180);
    const y =
      this.y * Math.cos((degrees * Math.PI) / 180) +
      this.x * Math.sin((degrees * Math.PI) / 180);

    return new Vector(x, y);
  }

  public cross(other: Vector): Vector {
    var x = this.y * other.z - this.z * other.y;
    var y = this.z * other.x - this.x * other.z;
    var z = this.x * other.y - this.y * other.x;

    return new Vector(x, y, z);
  }

  public angleBetween180(other: Vector): number {
    return Math.acos(
      (this.x * other.x - this.y * other.y) /
        (this.magnitude() * other.magnitude())
    );
  }

  public angleBetween360(other: Vector): number {
    // var skalar = this.dot(other);
    var angle = this.angleBetween180(other) * (180 / Math.PI);
    var zCross = this.cross(other).z;

    if (zCross < 0) {
      return 360 - angle;
    }

    return angle;
  }
}
