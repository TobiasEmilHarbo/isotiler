import LayerRenderer from "./LayerRenderer";
import Buffer from "../Buffer";
import Camera from "../Camera";
import { Drawable } from "../library/Drawable";

export class StaticRenderer implements LayerRenderer {
  private static buffer: Buffer = new Buffer(3000, 3000);

  constructor(private camera: Camera) {}

  public update(deltaTime: number): void {}

  public static drawToBuffer(drawable: Drawable) {
    StaticRenderer.buffer.draw(drawable);
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.save();

    const { x, y } = this.camera.position.negate();

    StaticRenderer.buffer.drawOnTo(context, x, y);

    context.restore();
  }
}
