import { getGameReview } from '../utils/gameReviewScraper.js';

export const getGameReviewController = async (req, res) => {
    const { team1, team2, date } = req.query;
    console.log(team1, team2, date);

    if (!team1 || !team2 || !date) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        const review = await getGameReview(team1, team2, date);
        console.log(review);
        
        if (review) {
            res.json({ review });
        } else {
            res.status(200).json({ error: 'Game review not found' });
        }
    } catch (error) {
        console.error('Error in getGameReviewController:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
