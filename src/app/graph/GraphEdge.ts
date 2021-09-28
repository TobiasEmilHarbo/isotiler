import { GraphNode } from "./GraphNode";

export class GraphEdge<T> {
  constructor(
    private _nodeA: GraphNode<T>,
    private _nodeB: GraphNode<T>,
    private _weight: number,
    private _id: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get nodeA(): GraphNode<T> {
    return this._nodeA;
  }

  public get nodeB(): GraphNode<T> {
    return this._nodeB;
  }

  public get weight(): number {
    return this._weight;
  }
}
