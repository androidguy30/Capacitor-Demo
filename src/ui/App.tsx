import { Routes, Route, useNavigate, Link, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { games, getGameById } from '@core/games';
import { GameWebView } from './components/GameWebView';

function HomeScreen() {
  return (
    <div className="screen">
      <h2 className="screen-title">Welcome</h2>
      <p className="screen-body">
        Choose a Unity or Phaser game from the catalog to start playing.
      </p>
      <Link to="/games" className="primary-button">
        Browse Games
      </Link>
    </div>
  );
}

function GameCatalogScreen() {
  return (
    <div className="screen">
      <h2 className="screen-title">Games</h2>
      <ul className="game-list">
        {games.map((game) => (
          <li key={game.id} className="game-list-item">
            <Link to={`/games/${game.id}`} className="game-list-link">
              <div className="game-list-title">{game.name}</div>
              <div className="game-list-meta">
                <span className="game-list-tag">{game.type.toUpperCase()}</span>
                {game.description && (
                  <span className="game-list-description">{game.description}</span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface GameDetailScreenProps {
  gameId: string;
}

function GameDetailScreen({ gameId }: GameDetailScreenProps) {
  const navigate = useNavigate();
  const game = getGameById(gameId);

  if (!game) {
    return (
      <div className="screen">
        <h2 className="screen-title">Game not found</h2>
        <button className="secondary-button" onClick={() => navigate('/games')}>
          Back to Games
        </button>
      </div>
    );
  }

  return (
    <div className="screen screen-full">
      <GameWebView
        game={game}
        onExitRequested={() => navigate('/games')}
        onScoreSubmitted={(score) => {
          // Placeholder for score submission handling
          console.log('Score submitted', { gameId: game.id, score });
        }}
        onLevelCompleted={(levelId) => {
          // Placeholder for level completion handling
          console.log('Level completed', { gameId: game.id, levelId });
        }}
      />
    </div>
  );
}

function SettingsScreen() {
  return (
    <div className="screen">
      <h2 className="screen-title">Settings</h2>
      <p className="screen-body">
        This is a placeholder for platform-aware settings (sound, notifications, controls).
      </p>
    </div>
  );
}

function GameDetailRoute() {
  const params = useParams<{ id: string }>();
  const id = params.id ?? '';
  return <GameDetailScreen gameId={id} />;
}

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/games" element={<GameCatalogScreen />} />
        <Route path="/games/:id" element={<GameDetailRoute />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </Layout>
  );
}

