// components/PlayerAvatars.tsx
'use client';
import Image from 'next/image';

interface PlayerAvatarsProps {
  onAvatarClick?: (id: number) => void;
}
const PlayerAvatars: React.FC<PlayerAvatarsProps> = ({onAvatarClick}) => {
  // Dummy image URLs and alt text for players
  const players = [
    { id: 1, name: 'Player 1', img: 'http://n.sinaimg.cn/sports/transform/97/w414h483/20191204/ca44-ikhvemx7273108.png' },
    { id: 2, name: 'Player 2', img: 'http://n.sinaimg.cn/sports/transform/97/w414h483/20191204/ca44-ikhvemx7273108.png' },
    { id: 3, name: 'Player 3', img: 'http://n.sinaimg.cn/sports/transform/97/w414h483/20191204/ca44-ikhvemx7273108.png' },
    { id: 4, name: 'Player 4', img: 'http://n.sinaimg.cn/sports/transform/97/w414h483/20191204/ca44-ikhvemx7273108.png' },
    { id: 5, name: 'Player 5', img: 'http://n.sinaimg.cn/sports/transform/97/w414h483/20191204/ca44-ikhvemx7273108.png' },
    { id: 6, name: 'Player 6', img: 'http://n.sinaimg.cn/sports/transform/97/w414h483/20191204/ca44-ikhvemx7273108.png' },
    { id: 7, name: 'Player 7', img: 'http://n.sinaimg.cn/sports/transform/97/w414h483/20191204/ca44-ikhvemx7273108.png' },
    { id: 8, name: 'Player 8', img: 'http://n.sinaimg.cn/sports/transform/97/w414h483/20191204/ca44-ikhvemx7273108.png' },
    { id: 9, name: 'Player 9', img: 'http://n.sinaimg.cn/sports/transform/97/w414h483/20191204/ca44-ikhvemx7273108.png' },
    { id: 10, name: 'Player 10', img: 'http://n.sinaimg.cn/sports/transform/97/w414h483/20191204/ca44-ikhvemx7273108.png' },
  ];

  const handlePlayerClick = (id: number) => {
    console.log(`Player with id ${id} clicked`);
    if (onAvatarClick) {
      onAvatarClick(id);
    }
  }

  return (
    <div className="flex gap-2">
      {players.map((player) => (
        <div key={player.id} 
        onClick={() => handlePlayerClick(player.id)}
        className="mx-2 w-20 h-20 overflow-hidden border border-gray-300 hover:border-cp-yellow hover:border-4 hover:scale-125 hover:transition">
          <Image src={player.img} alt={player.name} width={80} height={80} className="object-cover" />
        </div>
      ))}
    </div>
  );
};

export default PlayerAvatars;