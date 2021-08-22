export default class Timer {
  private deltaTime: number = 1 / 60;
  private accumulatedTime = 0;
  private lastTime = 0;

  private update: (deltaTime: number) => void;

  public onUpdate(update: (deltaTime: number) => void): void {
    this.update = update;
  }

  private tick(time: number = 0): void {
    this.accumulatedTime += (time - this.lastTime) / 1000;

    while (this.accumulatedTime > this.deltaTime) {
      this.update(this.deltaTime);

      this.accumulatedTime -= this.deltaTime;
    }

    requestAnimationFrame(this.tick.bind(this));

    this.lastTime = time;
  }

  public start(): void {
    this.tick();
  }
}
