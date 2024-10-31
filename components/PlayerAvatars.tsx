// components/PlayerAvatars.tsx
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Player } from '@types';

interface PlayerAvatarsProps {
  onAvatarClick?: (id: string) => void;
  teamHome: boolean;
  dataType: 'real-time' | 'historical';
}


const PlayerAvatars: React.FC<PlayerAvatarsProps> = ({onAvatarClick, teamHome, dataType}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  useEffect(() => {
    const selectedGame = localStorage.getItem('selectedGame'); // '1013' or '0406'
    const requestUrl = teamHome ? `/api/player-avatar/${selectedGame}?home=true` : `/api/player-avatar/${selectedGame}?home=false`;

    const fetchPlayerImages = async () => {
      try {
        const response = await fetch(requestUrl);
        const data = await response.json();

        const randomPlayers: Player[] = data.players.map((player: Player) => ({
          id: player.id,
          name: player.name,
          team: player.team,
          number: player.number,
          imgUrl: player.imgUrl,
        }));


        setPlayers(randomPlayers);
      } catch (error) {
        console.error('Failed to fetch player images:', error);
      }
    };

    fetchPlayerImages();
  }, [teamHome, dataType]);

  const handlePlayerClick = (id: string) => {
    setSelectedPlayerId(id);
    if (onAvatarClick) {
      onAvatarClick(id);
    }
  }

  return (
    <div className="flex gap-2 w-full justify-between px-8">
      {players.map((player) => (
        <div
          key={player.id}
          onClick={() => handlePlayerClick(player.id)}
          className={`mx-2 flex flex-col items-center
            ${selectedPlayerId === player.id ? "border-emerald-400 border-t-8" : "border-transparent border-t-8"}
            `}
        >
          <div className="w-20 h-20 overflow-hidden border border-gray-300 rounded-lg shadow-md">
            <Image
              src={player.imgUrl}
              alt={player.name}
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <p className="mt-1 text-sm font-semibold text-gray-700 text-center">
            {player.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PlayerAvatars;