import Buffer from "../Buffer";
import Camera from "../Camera";
import Line from "../geometry/Line";
import Rectangle from "../geometry/Rectangle";
import { RoadGraph } from "../graph/RoadGraph";
import Vector from "../Vector";
import LayerRenderer from "./LayerRenderer";

export default class RoadGraphRenderer implements LayerRenderer {
  private buffer: Buffer;

  constructor(private camera: Camera, private graph: RoadGraph) {
    this.buffer = new Buffer(2500, 2000);
    const context = this.buffer.context;

    this.graph.edges.forEach((edge) => {
      const offset = new Vector(
        6 * (Math.round(Math.random()) * 2 - 1),
        6 * (Math.round(Math.random()) * 2 - 1)
      );

      context.strokeStyle = "red";
      const pointA = edge.nodeA.value.center.add(offset);
      const pointB = edge.nodeB.value.center.add(offset);
      const line = new Line(pointA, pointB);
      this.buffer.draw(line);

      context.fillStyle = "black";

      const rectangle = new Rectangle(14, 14);
      rectangle.position = line.midPoint.subtract(new Vector(7, 11));

      context.fill(rectangle.path);

      context.fillStyle = "red";
      context.font = "bold 10px verdana, sans-serif ";

      const textPosition = line.midPoint;
      context.textAlign = "center";
      context.fillText(edge.weight.toString(), textPosition.x, textPosition.y);
    });
  }

  public update(deltaTime: number): void {}

  public draw(context: CanvasRenderingContext2D): void {
    context.save();

    const { x, y } = this.camera.position.negate();

    this.buffer.drawOnTo(context, x, y);

    context.restore();
  }
}
