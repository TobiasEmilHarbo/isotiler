import Canvas from "./Canvas";
import { worldLoader } from "./library/loaders";
import Timer from "./Timer";

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
});
