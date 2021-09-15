import Canvas from "./Canvas";
import MouseControl, { BUTTON, MOUSE_EVENTS } from "./Inputs/MouseControl";
import { worldLoader } from "./library/loaders";
import Timer from "./Timer";

const canvas = new Canvas(1024, 512);
canvas.appendTo(document.body);

worldLoader("one").subscribe((world) => {
  const timer = new Timer();

  timer.onUpdate((deltaTime) => {
    canvas.clear();
    world.update(deltaTime);

    canvas.draw(world);
  });

  timer.start();

  // const mouse = new MouseControl(true);

  // mouse.addEventMapping(MOUSE_EVENTS.MOUSE_DOWN, {
  //   [BUTTON.RIGHT]: (coordinates) => {},
  // });
});

Number.prototype.equals = function (other: number, precision: number = 4) {
  return (
    parseFloat(this.toFixed(precision)) == parseFloat(other.toFixed(precision))
  );
};

Number.prototype.equalOrLessThan = function (
  other: number,
  precision: number = 4
) {
  return (
    parseFloat(this.toFixed(precision)) <= parseFloat(other.toFixed(precision))
  );
};

Number.prototype.lessThan = function (other: number, precision: number = 4) {
  return (
    parseFloat(this.toFixed(precision)) < parseFloat(other.toFixed(precision))
  );
};
