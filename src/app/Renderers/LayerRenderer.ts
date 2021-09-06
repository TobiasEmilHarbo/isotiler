import { Drawable } from "../library/Drawable";

export default interface LayerRenderer extends Drawable {
  update(deltaTime: number): void;
}
