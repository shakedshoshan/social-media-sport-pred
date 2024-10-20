import pool from '../db.js';
export const updateScores = async (date) => {
    try {
        // Example of date format that works: 'YYYY-MM-DD'
        // Fetch all events with status 'STATUS_FINAL' on the specified date
        const eventsResult = await pool.query(
            `SELECT id, event_id, home_team_id, away_team_id, score_home, score_away 
             FROM events 
             WHERE event_status = $1 AND DATE(event_date) = $2`,
             ['STATUS_FINAL', date]
        );

        for (const event of eventsResult.rows) {
            let winner_team_id = null;

            if (event.score_home > event.score_away) {
                winner_team_id = event.home_team_id;
            } else if (event.score_away > event.score_home) {
                winner_team_id = event.away_team_id;
            }

            if (winner_team_id) {
                // Fetch all user_ids who made correct guesses for this event
                const guessesResult = await pool.query(
                    `SELECT user_id 
                     FROM guesses 
                     WHERE event_id = $1 AND winner_team_id = $2`,
                     [event.event_id, winner_team_id]
                );

                const userIds = guessesResult.rows.map(row => row.user_id);

                if (userIds.length > 0) {
                    // Update user_groups scores
                    await pool.query(
                        `UPDATE user_groups 
                         SET score = score + 1 
                         WHERE user_id = ANY($1::int[])`,
                         [userIds]
                    );
                }
            }
        }
    } catch (error) {
        console.error('Error updating scores:', error);
    }
};
