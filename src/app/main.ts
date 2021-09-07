import Canvas from "./Canvas";
import { entitySpriteSheetFactoryLoader, worldLoader } from "./library/loaders";
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

  document.querySelector("canvas").addEventListener("mouseup", (event) => {
    const tileWidth = 128;
    const tileHeight = 64;

    const determinate = (tileWidth * tileHeight) / 2;

    const rows = 7;

    const offset = (rows * Math.pow(tileHeight, 2)) / 2;

    const x =
      ((event.offsetX * -tileHeight) / 2 +
        (event.offsetY * tileWidth) / 2 +
        offset) /
      determinate;

    const y =
      ((event.offsetX * tileHeight) / 2 +
        (event.offsetY * tileWidth) / 2 -
        offset) /
      determinate;

    console.log("TILE:", Math.floor(x), Math.floor(y));
  });
});

entitySpriteSheetFactoryLoader();
