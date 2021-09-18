import Vector from "../Vector";

export interface EventActions {
  [BUTTON.LEFT]?: (mouseCoordinates: Vector, modifiers: Modifiers) => void;
  [BUTTON.MIDDLE]?: (mouseCoordinates: Vector, modifiers: Modifiers) => void;
  [BUTTON.RIGHT]?: (mouseCoordinates: Vector, modifiers: Modifiers) => void;
}

export interface Modifiers {
  [MODIFIER.CTRL]?: boolean;
  [MODIFIER.SHIFT]?: boolean;
  [MODIFIER.ALT]?: boolean;
}

export enum MOUSE_EVENTS {
  CLICK = "click",
  MOUSE_UP = "mouseup",
  MOUSE_DOWN = "mousedown",
}

export enum BUTTON {
  LEFT,
  MIDDLE,
  RIGHT,
}

export enum MODIFIER {
  SHIFT = "shiftKey",
  ALT = "altKey",
  CTRL = "ctrlKey",
}

class MouseListener {
  private static keyboardListener = new MouseListener();
  private target: EventTarget = document;

  private listeners = Array<MouseControl>();

  private constructor() {
    [
      MOUSE_EVENTS.MOUSE_DOWN,
      MOUSE_EVENTS.MOUSE_UP,
      MOUSE_EVENTS.CLICK,
    ].forEach((event) =>
      this.target.addEventListener(event, this.onMouseEvent.bind(this))
    );
  }

  private onMouseEvent(event: MouseEvent): void {
    for (var i = this.listeners.length - 1; i >= 0; i--) {
      this.listeners[i].onMouseEvent(event);
    }
  }

  public static getInstance(): MouseListener {
    return this.keyboardListener;
  }

  public addController(controller: MouseControl) {
    this.listeners.push(controller);
  }
}

export default class MouseControl {
  private mouse = MouseListener.getInstance();
  private eventMapping = new Map<MOUSE_EVENTS, EventActions>();

  constructor(private activated: boolean = false) {
    this.mouse.addController(this);
  }

  public onMouseEvent(event: MouseEvent): void {
    if (!this.activated) return;

    const type = event.type as MOUSE_EVENTS;

    if (!this.eventMapping.has(type)) return;

    const actions = this.eventMapping.get(type);
    const action = actions[event.button as BUTTON];
    // event.preventDefault();

    if (!action) return;

    action(new Vector(event.offsetX, event.offsetY), {
      [MODIFIER.CTRL]: event.ctrlKey,
      [MODIFIER.ALT]: event.altKey,
      [MODIFIER.SHIFT]: event.shiftKey,
    });
  }

  public activate() {
    this.activated = true;
  }

  public addEventMapping(event: MOUSE_EVENTS, actions: EventActions) {
    this.eventMapping.set(event, actions);
  }
}

export const modifiers = function (
  requiredModifiers: Array<MODIFIER>,
  action: (mouseCoordinates: Vector, modifiers: Modifiers) => void
) {
  return (mouseCoordinates: Vector, modifiers: Modifiers) => {
    if (requiredModifiers.every((modifier) => !!modifiers[modifier]))
      return action(mouseCoordinates, modifiers);
  };
};
