import { Link } from "./Link";

export class LinkedList<T> implements Iterable<T> {
  private head: Link<T>;
  private _tail: Link<T>;

  constructor(private compare?: (valueA: T, valueB: T) => number) {}

  public get tail(): Link<T> {
    return this._tail;
  }

  public set tail(link: Link<T>) {
    link.next = null;
    this._tail = link;
  }

  public add(value: T) {
    const newLink = new Link(value);
    if (!this.head) {
      this.head = newLink;
      this.tail = newLink;
    } else if (!!this.compare) {
      let next = this.head;

      while (!!next) {
        const current = next;
        next = current.next;

        const comparison = this.compare(current.value, newLink.value);

        if (comparison <= 0) {
          newLink.next = current;
          newLink.previous = current.previous;
          if (!!current.previous) {
            current.previous.next = newLink;
          }
          current.previous = newLink;

          if (current == this.head) {
            this.head = newLink;
          }
          break;
        }

        if (this.tail == current) {
          current.next = newLink;
          newLink.previous = current;
          this.tail = newLink;
        }
      }
    } else {
      this.tail.next = newLink;
      this.tail = newLink;
    }
  }

  public [Symbol.iterator](): Iterator<T, any, undefined> {
    let next: Link<T> = this.head;
    return {
      next: () => {
        const current = next;
        next = current?.next;
        return {
          done: !current,
          value: current?.value,
        };
      },
    };
  }
}
