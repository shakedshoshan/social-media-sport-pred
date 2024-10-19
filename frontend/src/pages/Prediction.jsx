import React from 'react';
import useGetGames from '../hooks/predictions/useGetGames';
import { gameData } from '../assets/gameData';
import Game from '../components/Game';

const Prediction = () => {
  const nbaGames = gameData;

  const groupGamesByDate = (games) => {
    const grouped = {};
    games.forEach(game => {
      const date = new Date(game.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(game);
    });
    return grouped;
  };

  const groupedGames = nbaGames && nbaGames.events ? groupGamesByDate(nbaGames.events) : {};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-800 to-blue-950 text-transparent bg-clip-text py-2">
        NBA Game Predictions
      </h1>
      {Object.keys(groupedGames).length > 0 ? (
        Object.entries(groupedGames).map(([date, games], index) => (
          <div key={date} className="mb-8">
            <div className="flex items-center mb-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <h2 className="text-lg font-semibold uppercase text-gray-600 mx-4">{date}</h2>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <Game key={game.event_id} game={game} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No games available at the moment.</p>
      )}
    </div>
  );
};

export default Prediction;
