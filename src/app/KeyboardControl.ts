export interface ButtonActivationActions {
  [KEY_STATES.RELEASED]?: (state: KEY_STATES, key: KEYS) => void;
  [KEY_STATES.PRESSED]?: (state: KEY_STATES, key: KEYS) => void;
  default?: (state: KEY_STATES, key: KEYS) => void;
}

export enum KEYS {
  W = "KeyW",
  A = "KeyA",
  S = "KeyS",
  D = "KeyD",
  SPACE = "Space",
}

export enum KEY_STATES {
  PRESSED = "PRESSED",
  RELEASED = "RELEASED",
}

enum KEYBOARD_EVENTS {
  KEY_DOWN = "keydown",
  KEY_UP = "keyup",
}

class KeyboardListener {
  private static keyboardListener = new KeyboardListener();
  private keyStates = new Map<string, KEY_STATES>();
  private target: EventTarget = document;

  private listeners = Array<KeyboardControl>();

  private constructor() {
    [KEYBOARD_EVENTS.KEY_DOWN, KEYBOARD_EVENTS.KEY_UP].forEach((event) =>
      this.target.addEventListener(event, this.onKeyEvent.bind(this))
    );
  }

  private onKeyEvent(event: KeyboardEvent): void {
    const key = event.code;
    const newState =
      event.type == KEYBOARD_EVENTS.KEY_DOWN
        ? KEY_STATES.PRESSED
        : KEY_STATES.RELEASED;

    if (this.keyStates.get(key) == newState) return;

    this.keyStates.set(key, newState);

    for (var i = this.listeners.length - 1; i >= 0; i--) {
      this.listeners[i].onKeyEvent(key as KEYS, newState, event);
    }
  }

  public addController(controller: KeyboardControl) {
    this.listeners.push(controller);
  }

  public static getInstance(): KeyboardListener {
    return this.keyboardListener;
  }
}

export default class KeyboardControl {
  private keyboard = KeyboardListener.getInstance();
  private keyMapping = new Map<string, ButtonActivationActions>();

  constructor(private activated: boolean = false) {
    this.keyboard.addController(this);
  }

  public activate() {
    this.activated = true;
  }

  public deactivate() {
    this.activated = false;
  }

  public addKeyMapping(key: KEYS, actions: ButtonActivationActions) {
    this.keyMapping.set(key, actions);
  }

  public onKeyEvent(key: KEYS, state: KEY_STATES, event: KeyboardEvent): void {
    if (!this.activated) return;
    if (!this.keyMapping.has(key)) return;

    const actions = this.keyMapping.get(key);
    const stateAction = actions[state];
    event.preventDefault();

    if (!!stateAction) stateAction(state, key);

    if (!!actions.default) actions.default(state, key);
  }
}
