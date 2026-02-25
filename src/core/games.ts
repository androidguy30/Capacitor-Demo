export type GameType = 'unity' | 'phaser';

export interface GameDefinition {
  id: string;
  name: string;
  type: GameType;
  description?: string;
  thumbnailUrl?: string;
  playUrl: string;
}

export const games: GameDefinition[] = [
  {
    id: 'super-mario-demo',
    name: 'Super Mario Demo',
    type: 'phaser',
    description: 'Side-scrolling platformer built with Phaser.',
    thumbnailUrl: '',
    playUrl: 'https://super-mario-demo-eight.vercel.app/',
  },
  {
    id: 'unity-webgl-sample',
    name: 'Unity WebGL Sample',
    type: 'unity',
    description: 'Placeholder Unity WebGL game endpoint.',
    thumbnailUrl: '',
    playUrl: 'https://example.com/unity-webgl-placeholder',
  },
];

export function getGameById(id: string): GameDefinition | undefined {
  return games.find((game) => game.id === id);
}

