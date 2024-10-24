import pool from '../db.js';
import { gameData } from '../../frontend/src/assets/gameData.js';

export const updateGames = async (date) => {
    const getThreeDaysAhead = () => {
        const date = new Date();
        date.setDate(date.getDate() + 3);
        return date.toISOString().split('T')[0];
    };
  

  const targetDate = date ? date : getThreeDaysAhead();
  const url = `https://therundown-therundown-v1.p.rapidapi.com/sports/4/events/${targetDate}?include=scores&affiliate_ids=1%2C2%2C3&offset=0`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '948f8b4495mshce728272b155600p12d3a9jsndb97509bab0d',
	  'x-rapidapi-host': 'therundown-therundown-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const CurrentgameData = await response.json();
  
    const events = CurrentgameData ? CurrentgameData.events : gameData.events;

    for (const event of events) {
      const {
        event_id,
        event_uuid,
        sport_id,
        event_date,
        score: {
          venue_name,
          venue_location,
          broadcast,
          event_status,
          event_status_detail,
          score_away,
          score_home
        },
        teams_normalized,
        schedule: {
          season_type,
          season_year,
          event_name,
          attendance
        }
      } = event;

      const homeTeam = teams_normalized.find(team => !team.is_away);
      const awayTeam = teams_normalized.find(team => team.is_away);

      if (!homeTeam || !awayTeam) {
        console.error(`Missing team information for event_id: ${event_id}`);
        continue;
      }

      const query = `
        INSERT INTO events (
          event_id, event_uuid, sport_id, event_date,
          venue_name, venue_location,
          home_team_id, away_team_id,
          home_team_name, away_team_name,
          home_team_mascot, away_team_mascot,
          home_team_abbreviation, away_team_abbreviation,
          home_team_conference, away_team_conference,
          home_team_division, away_team_division,
          home_team_record, away_team_record,
          season_type, season_year,
          broadcast, event_status, event_status_detail,
          score_home, score_away
        ) VALUES (
          $1, $2, $3, $4,
          $5, $6,
          $7, $8,
          $9, $10,
          $11, $12,
          $13, $14,
          $15, $16,
          $17, $18,
          $19, $20,
          $21, $22,
          $23, $24, $25,
          $26, $27
        )
        ON CONFLICT (event_id) DO UPDATE SET
          event_uuid = EXCLUDED.event_uuid,
          sport_id = EXCLUDED.sport_id,
          event_date = EXCLUDED.event_date,
          venue_name = EXCLUDED.venue_name,
          venue_location = EXCLUDED.venue_location,
          home_team_id = EXCLUDED.home_team_id,
          away_team_id = EXCLUDED.away_team_id,
          home_team_name = EXCLUDED.home_team_name,
          away_team_name = EXCLUDED.away_team_name,
          home_team_mascot = EXCLUDED.home_team_mascot,
          away_team_mascot = EXCLUDED.away_team_mascot,
          home_team_abbreviation = EXCLUDED.home_team_abbreviation,
          away_team_abbreviation = EXCLUDED.away_team_abbreviation,
          home_team_conference = EXCLUDED.home_team_conference,
          away_team_conference = EXCLUDED.away_team_conference,
          home_team_division = EXCLUDED.home_team_division,
          away_team_division = EXCLUDED.away_team_division,
          home_team_record = EXCLUDED.home_team_record,
          away_team_record = EXCLUDED.away_team_record,
          season_type = EXCLUDED.season_type,
          season_year = EXCLUDED.season_year,
          broadcast = EXCLUDED.broadcast,
          event_status = EXCLUDED.event_status,
          event_status_detail = EXCLUDED.event_status_detail,
          score_home = EXCLUDED.score_home,
          score_away = EXCLUDED.score_away,
          updated_at = CURRENT_TIMESTAMP;
      `;

      const values = [
        event_id,
        event_uuid,
        sport_id,
        event_date,
        venue_name,
        venue_location,
        homeTeam.team_id,
        awayTeam.team_id,
        homeTeam.name,
        awayTeam.name,
        homeTeam.mascot,
        awayTeam.mascot,
        homeTeam.abbreviation,
        awayTeam.abbreviation,
        homeTeam.conference.name,
        awayTeam.conference.name,
        homeTeam.division.name,
        awayTeam.division.name,
        homeTeam.record,
        awayTeam.record,
        season_type,
        season_year,
        broadcast,
        event_status,
        event_status_detail,
        score_home,
        score_away
      ];

      try {
        await pool.query(query, values);
        console.log(`Event ${event_id} inserted/updated successfully.`);
      } catch (dbError) {
        console.error(`Database error for event_id ${event_id}:`, dbError);
      }
    }
  } catch (error) {
    console.error('Error fetching or processing game data:', error);
  }
};

// // Schedule the updateGames function to run once a day
// const ONE_DAY_MS = 24 * 60 * 60 * 1000;

// setInterval(() => {
//   console.log('Running daily game update...');
//   updateGames();
// }, ONE_DAY_MS);

// // Optionally, run immediately on startup
// updateGames();
