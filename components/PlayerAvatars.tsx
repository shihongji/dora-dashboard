// components/PlayerAvatars.tsx
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface PlayerAvatarsProps {
  onAvatarClick?: (id: number) => void;
}
interface Player {
  id: number;
  name: string;
  img: string;
}

const PlayerAvatars: React.FC<PlayerAvatarsProps> = ({onAvatarClick}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  useEffect(() => {
    const fetchPlayerImages = async () => {
      try {
        const response = await fetch('/api/player-avatar/random');
        const data = await response.json();
        console.log(data);

        // Create player objects using the fetched image URLs
        const randomPlayers: Player[] = data.imageUrls.map((url: string, index: number) => ({
          id: index + 1, // Assign a unique ID to each player
          name: `Player ${index + 1}`,
          img: url,
        }));

        setPlayers(randomPlayers);
      } catch (error) {
        console.error('Failed to fetch player images:', error);
      }
    };

    fetchPlayerImages();
  }, []);

  const handlePlayerClick = (id: number) => {
    console.log(`Player with id ${id} clicked`);
    setSelectedPlayerId(id);
    if (onAvatarClick) {
      onAvatarClick(id);
    }
  }

  return (
    <div className="flex gap-2">
      {players.map((player) => (
        <div key={player.id} 
        onClick={() => handlePlayerClick(player.id)}
        className={`mx-2 w-20 h-20 overflow-hidden border border-gray-300 
          ${selectedPlayerId === player.id ? "border-cp-yellow border-4 scale-125" : "hover:border-cp-yellow hover:border-4 hover:scale-125"}
          transition-all duration-300`}
      >
          <Image src={player.img} alt={player.name} width={80} height={80} className="object-cover" />
        </div>
      ))}
    </div>
  );
};

export default PlayerAvatars;