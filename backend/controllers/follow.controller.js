import pool from '../db.js';

// Add a follow relationship
const addFollow = async (req, res) => {
    const { followed_id } = req.body;
    const follower_id = req.user.id;
    try {
        const newFollow = await pool.query(
            'INSERT INTO follows (follower_id, followed_id) VALUES ($1, $2) RETURNING *',
            [follower_id, followed_id]
        );
        res.json(newFollow.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Remove a follow relationship
const removeFollow = async (req, res) => {
    const { followed_id } = req.params;
    const follower_id = req.user.id;
    try {
        await pool.query(
            'DELETE FROM follows WHERE follower_id = $1 AND followed_id = $2',
            [follower_id, followed_id]
        );
        res.json({ message: 'Follow relationship removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all followers of a user
const getFollowers = async (req, res) => {
    const { user_id } = req.params;
    try {
        const followers = await pool.query(
            'SELECT u.id, u.username, u.profilePic FROM follows f JOIN users u ON f.follower_id = u.id WHERE f.followed_id = $1',
            [user_id]
        );
        res.json(followers.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all users that a user follows
const getFollowing = async (req, res) => {
    const { user_id } = req.params;
    try {
        const following = await pool.query(
            'SELECT u.id, u.username, u.profilePic FROM follows f JOIN users u ON f.followed_id = u.id WHERE f.follower_id = $1',
            [user_id]
        );
        res.json(following.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Check if a user is following another user
const isFollowing = async (req, res) => {
    const { followed_id } = req.params;
    const follower_id = req.user.id;
    try {
        const result = await pool.query(
            'SELECT 1 FROM follows WHERE follower_id = $1 AND followed_id = $2',
            [follower_id, followed_id]
        );
        const isFollowing = result.rowCount > 0;
        res.json({ isFollowing });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


export {
    addFollow,
    removeFollow,
    getFollowers,
    getFollowing,
    isFollowing
};
