import { Observable, Subscriber } from "rxjs";

export const loadImage = (url: string): Observable<HTMLImageElement> => {
  return new Observable((subscriber: Subscriber<HTMLImageElement>) => {
    const sprite = new Image();
    sprite.src = url;
    sprite.onload = () => {
      subscriber.next(sprite);
      subscriber.complete();
    };
  });
};
