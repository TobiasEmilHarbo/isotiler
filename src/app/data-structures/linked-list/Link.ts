export class Link<T> {
  private _next: Link<T>;
  private _previous: Link<T>;

  constructor(private _value: T) {}

  public set next(newLink: Link<T>) {
    this._next = newLink;
  }

  public get next(): Link<T> {
    return this._next;
  }

  public get previous(): Link<T> {
    return this._previous;
  }

  public set previous(newLink: Link<T>) {
    this._previous = newLink;
  }

  public get value(): T {
    return this._value;
  }

  public hasNext(): boolean {
    return !!this._next && this._next != this;
  }
}
