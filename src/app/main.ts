import Canvas from "./Canvas";
import Circle from "./geometry/Circle";
import Line from "./geometry/Line";
import Rectangle from "./geometry/Rectangle";
import { worldLoader } from "./library/loaders";
import Timer from "./Timer";
import Vector from "./Vector";

const canvas = new Canvas(1024, 512);
canvas.appendTo(document.body);

worldLoader("one").subscribe((world) => {
  const timer = new Timer();

  timer.onUpdate((deltaTime) => {
    canvas.clear();
    world.update(deltaTime);
    world.draw(canvas.context);
  });

  timer.start();

  document
    .querySelector("canvas")
    .addEventListener("mouseup", ({ offsetX: x, offsetY: y }) => {});
});
