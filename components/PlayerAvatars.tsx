// components/PlayerAvatars.tsx
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface PlayerAvatarsProps {
  onAvatarClick?: (id: string) => void;
}
interface Player {
  ID: string; // Use string to match the ID type in player data
  name: string;
  team: string;
  position: string;
  img: string;
}


const PlayerAvatars: React.FC<PlayerAvatarsProps> = ({onAvatarClick}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  useEffect(() => {
    const fetchPlayerImages = async () => {
      try {
        const response = await fetch('/api/player-avatar/random');
        const data = await response.json();

        const randomPlayers: Player[] = data.players.map((player: Player) => ({
          ID: player.ID,
          name: player.name,
          team: player.team,
          position: player.position,
          img: `/images/players/${player.ID}.jpg`, // Construct image path based on player ID
        }));


        setPlayers(randomPlayers);
      } catch (error) {
        console.error('Failed to fetch player images:', error);
      }
    };

    fetchPlayerImages();
  }, []);

  const handlePlayerClick = (id: string) => {
    setSelectedPlayerId(id);
    if (onAvatarClick) {
      onAvatarClick(id);
    }
  }

  return (
    <div className="flex gap-2 w-full justify-between px-4">
      {players.map((player) => (
        <div key={player.ID} 
        onClick={() => handlePlayerClick(player.ID)}
        className={`mx-2 flex px-1
          ${selectedPlayerId === player.ID ? "border-emerald-400 border-t-8" : "border-transparent border-t-8"}
          `}
      >
        <div className='flex flex-col w-20 h-20 overflow-hidden border border-gray-300'>
          <Image src={player.img} alt={player.name} width={80} height={80} className="object-cover flex-1" />
          </div>
          <div className='ml-2 text-base my-auto text-left'>
            <p className="font-semibold text-gray-700">{player.name}</p>
            <p className="font-semibold text-gray-700">24</p>
            <p className="font-semibold text-gray-700">{player.position}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerAvatars;