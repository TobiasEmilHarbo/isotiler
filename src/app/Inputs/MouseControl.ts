import Vector from "../Vector";

type EventAction = (mouseCoordinates: Vector, modifiers: Modifiers) => void;
export interface EventActions {
  [BUTTON.LEFT]?: EventAction;
  [BUTTON.MIDDLE]?: EventAction;
  [BUTTON.RIGHT]?: EventAction;
}

export interface Modifiers {
  [MODIFIER.CTRL]?: boolean;
  [MODIFIER.SHIFT]?: boolean;
  [MODIFIER.ALT]?: boolean;
}

export enum MOUSE_EVENTS {
  CLICK = "click",
  RIGHT_CLICK = "contextmenu",
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

  private listeners = Array<MouseControl>();
  private targetSelector = "canvas";

  private constructor() {
    window.onload = () => {
      const target = document.querySelector(this.targetSelector);
      if (!target) return;
      Object.values(MOUSE_EVENTS).forEach((event) =>
        target.addEventListener(event, (event: MouseEvent) => {
          this.onMouseEvent(event);
        })
      );
    };
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

    if (!action) return;

    event.preventDefault();

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

export const noModifiers = function (action: EventAction): EventAction {
  return (mouseCoordinates: Vector, modifiers: Modifiers) => {
    if (Object.values(modifiers).every((activated) => !activated)) {
      return action(mouseCoordinates, modifiers);
    }
  };
};

export const modifiers = function (
  requiredModifiers: Array<MODIFIER>,
  action: EventAction
): EventAction {
  return (mouseCoordinates: Vector, modifiers: Modifiers) => {
    if (
      requiredModifiers.every(
        (requiredModifier) => !!modifiers[requiredModifier]
      )
    ) {
      return action(mouseCoordinates, modifiers);
    }
  };
};
