export class GraphNode<T> {
  private _neighbors = new Array<{
    node: GraphNode<T>;
    weight: number;
  }>();

  constructor(private _value: T) {}

  public get value(): T {
    return this._value;
  }

  public addNeighbor(neighbor: GraphNode<T>, weight: number) {
    this._neighbors.push({
      node: neighbor,
      weight,
    });
  }

  public get neighbors(): Array<{
    node: GraphNode<T>;
    weight: number;
  }> {
    return this._neighbors;
  }

  public hasNeighbor(value: T): boolean {
    return !!this._neighbors.find((neighbor) => neighbor.node.value == value);
  }
}
