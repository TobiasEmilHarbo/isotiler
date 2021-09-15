export default class Timer {
  private deltaTime: number = 1 / 60;
  private accumulatedTime = 0;
  private lastTime = 0;

  private update: (deltaTime: number) => void;

  public onUpdate(update: (deltaTime: number) => void): void {
    this.update = update;
  }

  private tick(time: number = 0): void {
    if (this.lastTime != 0) {
      this.accumulatedTime += (time - this.lastTime) / 1000;

      if (this.accumulatedTime > 1) {
        this.accumulatedTime = 1;
      }

      while (this.accumulatedTime > this.deltaTime) {
        this.update(this.deltaTime);

        this.accumulatedTime -= this.deltaTime;
      }
    }

    this.lastTime = time;

    requestAnimationFrame(this.tick.bind(this));
  }

  public start(): void {
    this.tick();
  }
}
