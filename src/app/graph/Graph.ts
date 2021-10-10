import { GraphEdge } from "./GraphEdge";
import { GraphNode } from "./GraphNode";

export class Graph<T> {
  private _nodes = new Map<T, GraphNode<T>>();
  private _edges = new Array<GraphEdge<T>>();

  public get nodes(): Map<T, GraphNode<T>> {
    return this._nodes;
  }

  public get edges(): Array<GraphEdge<T>> {
    return this._edges;
  }

  public addEdge(source: T, destination: T, weight: number, id: string): void {
    const sourceNode = this.addVertex(source);
    const destinationNode = this.addVertex(destination);

    sourceNode.addNeighbor(destinationNode, weight);
    destinationNode.addNeighbor(sourceNode, weight);

    this._edges.push(new GraphEdge(sourceNode, destinationNode, weight, id));
  }

  public addVertex(value: T): GraphNode<T> {
    if (this.hasVertex(value)) {
      return this._nodes.get(value);
    }

    const vertex = new GraphNode(value);
    this._nodes.set(value, vertex);
    return vertex;
  }

  public hasEdge(id: string) {
    return !!this._edges.find((edge) => edge.id == id);
  }

  public hasVertex(value: T): boolean {
    return this._nodes.has(value);
  }
}
