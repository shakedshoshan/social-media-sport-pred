import pool from '../db.js';

export const createGuess = async (req, res) => {
    const { event_id, winner_team_id, point_difference } = req.body;
    const user_id = req.user.id;

    try {
        // Check if a guess already exists for this user and event
        const checkQuery = `
            SELECT * FROM guesses
            WHERE event_id = $1 AND user_id = $2
        `;
        const checkValues = [event_id, user_id];
        const checkResult = await pool.query(checkQuery, checkValues);

        let result;
        if (checkResult.rows.length > 0) {
            // Update existing guess
            const updateQuery = `
                UPDATE guesses
                SET winner_team_id = $1, point_difference = $2, updated_at = CURRENT_TIMESTAMP
                WHERE event_id = $3 AND user_id = $4
                RETURNING *
            `;
            const updateValues = [winner_team_id, point_difference, event_id, user_id];
            result = await pool.query(updateQuery, updateValues);
        } else {
            // Insert new guess
            const insertQuery = `
                INSERT INTO guesses (event_id, user_id, winner_team_id, point_difference)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `;
            const insertValues = [event_id, user_id, winner_team_id, point_difference];
            result = await pool.query(insertQuery, insertValues);
        }

        if (result.rows.length > 0) {
            res.status(201).json({
                message: checkResult.rows.length > 0 ? 'Guess updated successfully' : 'Guess created successfully',
                guess: result.rows[0]
            });
        } else {
            res.status(400).json({ message: 'Failed to create or update guess' });
        }
    } catch (error) {
        console.error('Error creating or updating guess:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getGuessByEventAndUser = async (req, res) => {
    const { event_id } = req.params;
    const user_id = req.user.id;

    try {
        const query = `
            SELECT g.*

            FROM guesses g
            JOIN events e ON g.event_id = e.event_id
            WHERE g.event_id = $1 AND g.user_id = $2
        `;
        const values = [event_id, user_id];
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            res.status(200).json({
                message: 'Guess retrieved successfully',
                guess: result.rows[0]
            });
        } else {
            res.status(200).json({ message: 'No guess found for this event and user' });
        }
    } catch (error) {
        console.error('Error retrieving guess:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


