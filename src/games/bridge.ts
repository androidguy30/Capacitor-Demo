export type GameEventType =
  | 'ready'
  | 'loaded'
  | 'error'
  | 'score_submitted'
  | 'level_completed'
  | 'exit_requested'
  | 'pause'
  | 'resume';

export interface GameEvent<TPayload = unknown> {
  type: GameEventType;
  payload?: TPayload;
}

type GameEventHandler = (event: GameEvent) => void;

let handler: GameEventHandler | null = null;

export function attachGameEventListener(nextHandler: GameEventHandler): void {
  handler = nextHandler;
}

export function detachGameEventListener(): void {
  handler = null;
}

export function bindWindowMessageListener(): void {
  window.addEventListener('message', (event: MessageEvent) => {
    if (!event.data || typeof event.data !== 'object') return;
    const candidate = event.data as Partial<GameEvent>;
    if (!candidate.type) return;

    if (handler) {
      handler({
        type: candidate.type as GameEventType,
        payload: candidate.payload,
      });
    }
  });
}

export function sendGameEvent<TPayload = unknown>(
  iframe: HTMLIFrameElement | null,
  event: GameEvent<TPayload>,
): void {
  if (!iframe || !iframe.contentWindow) return;
  iframe.contentWindow.postMessage(event, '*');
}

