export default class Vector {
  public static readonly NORTH = new Vector(0, -1);
  public static readonly WEST = new Vector(-1, 0);

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

  public fixedLength(length: number): Vector {
    return this.multiply(length / this.magnitude());
  }

  public multiply(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  public dot(other: Vector) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  public magnitude(): number {
    return Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
    );
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
    const x = this.y * other.z - this.z * other.y;
    const y = this.z * other.x - this.x * other.z;
    const z = this.x * other.y - this.y * other.x;

    return new Vector(x, y, z);
  }

  public angleBetween180(other: Vector): number {
    return (
      Math.acos(this.dot(other) / (this.magnitude() * other.magnitude())) *
      (180 / Math.PI)
    );
  }

  public angleBetween(other: Vector): number {
    const angle = this.angleBetween180(other);

    const zCross = this.cross(other).z;

    if (zCross > 0) {
      return 360 - angle;
    }

    return angle;
  }

  public clone(): Vector {
    return new Vector(this.x, this.y, this.z);
  }

  public toString(): string {
    return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)})`;
  }
}
