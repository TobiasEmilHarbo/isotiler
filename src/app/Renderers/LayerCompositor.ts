import LayerRenderer from "./LayerRenderer";

export default class LayerCompositor implements LayerRenderer {
  private layers = new Array<LayerRenderer>();

  public addLayer(layer: LayerRenderer) {
    this.layers.unshift(layer);
  }

  public draw(context: CanvasRenderingContext2D): void {
    for (let index = this.layers.length - 1; index >= 0; index--) {
      const layer = this.layers[index];
      layer.draw(context);
    }
  }

  public update(deltaTime: number): void {
    for (let index = this.layers.length - 1; index >= 0; index--) {
      const layer = this.layers[index];
      layer.update(deltaTime);
    }
  }
}
