import pool from '../db.js';
import { getGameReview } from './gameReviewScraper.js';

export const updateTomorrowPreviews = async () => {
    const getTomorrowDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date.toISOString().split('T')[0];
    };
    
    const tomorrowDate = getTomorrowDate();
    
    try {
        const query = 'SELECT event_id, home_team_name, away_team_name FROM events WHERE event_date::date = $1';
        const result = await pool.query(query, [tomorrowDate]);
        const events = result.rows;
        
        for (const event of events) {
            const { event_id, home_team_name, away_team_name } = event;
            const preview = await getGameReview(home_team_name, away_team_name, tomorrowDate);
            console.log("preview: ", preview);
            
            if (preview) {
                const updateQuery = 'UPDATE events SET preview = $1, updated_at = NOW() WHERE event_id = $2';
                await pool.query(updateQuery, [preview, event_id]);
                console.log(`Updated preview for event_id: ${event_id}`);
            } else {
                console.log(`No preview found for event_id: ${event_id}`);
            }
        }
    } catch (error) {
        console.error('Error updating tomorrow previews:', error);
    }
};
