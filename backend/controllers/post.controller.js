import pool from '../db.js';

// Create a new post
export const createPost = async (req, res) => {
	try {
		const { title, content, guess } = req.body;
		const userId = req.user.id; // Assuming you have user authentication middleware

		if (!title || !content || !guess) {
			return res.status(400).json({ error: 'Title, content, and guess are required' });
		}

		const query = `
			INSERT INTO posts (title, content, guess, user_id)
			VALUES ($1, $2, $3, $4)
			RETURNING *
		`;
		const values = [title, content, guess, userId];

		const result = await pool.query(query, values);
		const newPost = result.rows[0];

		res.status(201).json(newPost);
	} catch (error) {
		console.error('Error creating post:', error);
		res.status(500).json({ error: 'Error creating post' });
	}
};

// Delete a post
export const deletePost = async (req, res) => {
	try {
		const postId = req.params.id;
		const userId = req.user.id;

		const checkOwnershipQuery = 'SELECT user_id FROM posts WHERE id = $1';
		const checkResult = await pool.query(checkOwnershipQuery, [postId]);

		if (checkResult.rows.length === 0) {
			return res.status(404).json({ error: 'Post not found' });
		}

		if (checkResult.rows[0].user_id !== userId) {
			return res.status(403).json({ error: 'You can only delete your own posts' });
		}

		const deleteQuery = 'DELETE FROM posts WHERE id = $1';
		await pool.query(deleteQuery, [postId]);

		res.status(200).json({ message: 'Post deleted successfully' });
	} catch (error) {
		console.error('Error deleting post:', error);
		res.status(500).json({ error: 'Error deleting post' });
	}
};

// Get all posts by user
export const getPostsByUser = async (req, res) => {
	try {
		const userId = req.user.id;

		const query = `
			SELECT * FROM posts
			WHERE user_id = $1
			ORDER BY created_at DESC
		`;
		const values = [userId];

		const result = await pool.query(query, values);
		const posts = result.rows;

		if (posts.length === 0) {
			return res.status(404).json({ message: 'No posts found for this user' });
		}

		res.status(200).json(posts);
	} catch (error) {
		console.error('Error fetching posts by user:', error);
		res.status(500).json({ error: 'Error fetching posts' });
	}
};

// get all posts
// Get all posts
export const getAllPosts = async (req, res) => {
	try {
		const query = `
			SELECT *
			FROM posts
			ORDER BY created_at DESC
		`;

		const result = await pool.query(query);
		const posts = result.rows;

		if (posts.length === 0) {
			return res.status(404).json({ message: 'No posts found' });
		}

		res.status(200).json(posts);
	} catch (error) {
		console.error('Error fetching all posts:', error);
		res.status(500).json({ error: 'Error fetching posts' });
	}
};


// Add like to a post
export const addLikeToPost = async (req, res) => {
	try {
		const postId = req.params.id;

		// Check if the post exists
		const checkPostQuery = 'SELECT * FROM posts WHERE id = $1';
		const postResult = await pool.query(checkPostQuery, [postId]);

		if (postResult.rows.length === 0) {
			return res.status(404).json({ error: 'Post not found' });
		}

		// Update the like count in the posts table
		const updateLikeCountQuery = 'UPDATE posts SET likes = likes + 1 WHERE id = $1';
		await pool.query(updateLikeCountQuery, [postId]);

		res.status(200).json({ message: 'Like added successfully' });
	} catch (error) {
		console.error('Error adding like to post:', error);
		res.status(500).json({ error: 'Error adding like to post' });
	}
};


















