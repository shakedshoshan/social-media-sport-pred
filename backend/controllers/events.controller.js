import pool from '../db.js';

export const getEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const query = `
            SELECT *
            FROM events
            WHERE event_id = $1
        `;
        const result = await pool.query(query, [eventId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const query = `
            SELECT *
            FROM events
            ORDER BY event_date DESC
        `;
        const result = await pool.query(query);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching all events:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};
