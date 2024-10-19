import React, { useState } from 'react';
import { NBALogos } from '../assets/NBA-logos';

const Game = ({ game }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [pointDifference, setPointDifference] = useState('');

  const handleTeamSelect = (teamId) => {
    setSelectedTeam(teamId);
  };

  const handlePointDifferenceChange = (e) => {
    setPointDifference(e.target.value);
  };

  const awayTeam = game.teams_normalized.find(team => team.is_away);
  const homeTeam = game.teams_normalized.find(team => team.is_home);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-800 to-blue-950 p-3 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/nba.png" alt="NBA Logo" className="w-4 h-4 mr-1" />
            <span className="font-semibold text-xs sm:text-sm">NBA</span>
          </div>
          <span className="text-xs sm:text-sm">{new Date(game.event_date).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div className="text-center">
            <img src={NBALogos[awayTeam.mascot]} alt={`${awayTeam.name} logo`} className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-1 sm:mb-2" />
            <p className="font-bold text-sm sm:text-base">{awayTeam.name} </p>
            <p className="text-xs font-semibold sm:text-sm text-gray-600">{awayTeam.mascot}</p>
            <p className="text-xs sm:text-sm text-gray-600">{awayTeam.record}</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">VS</p>
            <p className="text-xs sm:text-sm text-gray-600">{new Date(game.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div className="text-center">
            <img src={NBALogos[homeTeam.mascot]} alt={`${homeTeam.name} logo`} className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-1 sm:mb-2" />
            <p className="font-bold text-sm sm:text-base">{homeTeam.name} </p>
            <p className="text-xs font-semibold sm:text-sm text-gray-600">{homeTeam.mascot}</p>
            <p className="text-xs sm:text-sm text-gray-600">{homeTeam.record}</p>
          </div>
        </div>
        <div className="text-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
          <p>{game.score.venue_name}, {game.score.venue_location}</p>
        </div>
        <div className="mt-4 sm:mt-6 bg-gray-100 rounded-lg p-3 sm:p-4">
          <p className="text-center font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Make your prediction</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4">
            {[awayTeam, homeTeam].map((team) => (
              <button
                key={team.team_id}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 ${
                  selectedTeam === team.team_id
                    ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleTeamSelect(team.team_id)}
              >
                <span className="font-medium text-sm sm:text-base">{team.name}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0">
            <label htmlFor="pointDifference" className="mb-1 sm:mb-0 sm:mr-3 font-medium text-sm sm:text-base text-gray-700">Point difference:</label>
            <input
              type="number"
              id="pointDifference"
              value={pointDifference}
              onChange={handlePointDifferenceChange}
              className="border rounded-full px-3 sm:px-4 py-1 sm:py-2 w-20 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              min="1"
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
