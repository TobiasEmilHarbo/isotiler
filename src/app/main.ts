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

    canvas.draw(world);
  });

  timer.start();
});

Number.prototype.equals = function (
  other: number,
  precision: number = 4
): boolean {
  return (
    parseFloat(this.toFixed(precision)) == parseFloat(other.toFixed(precision))
  );
};

Number.prototype.lessThanOrEqualTo = function (
  other: number,
  precision: number = 4
): boolean {
  return (
    parseFloat(this.toFixed(precision)) <= parseFloat(other.toFixed(precision))
  );
};

Number.prototype.greaterThanOrEqualTo = function (
  other: number,
  precision?: number
): boolean {
  return (
    parseFloat(this.toFixed(precision)) >= parseFloat(other.toFixed(precision))
  );
};

Number.prototype.lessThan = function (
  other: number,
  precision: number = 4
): boolean {
  return (
    parseFloat(this.toFixed(precision)) < parseFloat(other.toFixed(precision))
  );
};
