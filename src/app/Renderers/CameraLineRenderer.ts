import Camera from "../Camera";
import LayerRenderer from "./LayerRenderer";

export class CameraLineRenderer implements LayerRenderer {
  constructor(private camera: Camera) {}

  public update(deltaTime: number) {}

  public draw(context: CanvasRenderingContext2D): void {
    this.camera.draw(context);
  }
}
