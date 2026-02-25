import { useEffect, useRef } from 'react';
import type { GameDefinition } from '@core/games';
import {
  attachGameEventListener,
  bindWindowMessageListener,
  detachGameEventListener,
  sendGameEvent,
  type GameEvent,
} from '@games/bridge';

interface GameWebViewProps {
  game: GameDefinition;
  onScoreSubmitted?: (score: number) => void;
  onLevelCompleted?: (levelId: string) => void;
  onExitRequested?: () => void;
}

export function GameWebView({
  game,
  onScoreSubmitted,
  onLevelCompleted,
  onExitRequested,
}: GameWebViewProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    bindWindowMessageListener();

    attachGameEventListener((event: GameEvent) => {
      switch (event.type) {
        case 'ready': {
          sendGameEvent(iframeRef.current, {
            type: 'loaded',
            payload: {
              gameId: game.id,
            },
          });
          break;
        }
        case 'score_submitted': {
          const score =
            typeof event.payload === 'number'
              ? event.payload
              : (event.payload as { score?: number } | undefined)?.score;
          if (typeof score === 'number' && onScoreSubmitted) {
            onScoreSubmitted(score);
          }
          break;
        }
        case 'level_completed': {
          const levelId =
            typeof event.payload === 'string'
              ? event.payload
              : (event.payload as { levelId?: string } | undefined)?.levelId;
          if (levelId && onLevelCompleted) {
            onLevelCompleted(levelId);
          }
          break;
        }
        case 'exit_requested': {
          if (onExitRequested) {
            onExitRequested();
          }
          break;
        }
        default:
          break;
      }
    });

    return () => {
      detachGameEventListener();
    };
  }, [game.id, onExitRequested, onLevelCompleted, onScoreSubmitted]);

  return (
    <div className="game-webview-container">
      <iframe
        ref={iframeRef}
        title={game.name}
        src={game.playUrl}
        allow="fullscreen; autoplay"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        className="game-webview-iframe"
      />
    </div>
  );
}

