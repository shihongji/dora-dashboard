// components/ScoreBoard.tsx
const ScoreBoard = ({ team1, team2, score1, score2, quarter, timeRemaining }: 
    { team1: string; team2: string; score1: number; score2: number; quarter: string; timeRemaining: string }) => {
    return (
      <div className="bg-cp-dark-blue text-white p-3 rounded-lg shadow-md w-full text-center">
        {/* Teams and Scores */}
        <div className="text-4xl font-bold my-2 pt-3 ">
          {team1}<span className="text-5xl text-cp-yellow"> {score1} : {score2} </span> {team2}
        </div>
        {/* Game Status */}
        <div className="text-lg">
          {quarter}   剩余 {timeRemaining}
        </div>
      </div>
    );
  };
  
  export default ScoreBoard;