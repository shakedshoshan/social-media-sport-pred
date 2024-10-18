import pool from '../db.js';

// Create a comment for a specific post
export const createComment = async (req, res) => {
	try {
		const { content, postId } = req.body;
		const userId = req.user.id;
        console.log(userId);

		if (!content || !postId) {
			return res.status(400).json({ error: 'Content and postId are required' });
		}

		const query = `
			INSERT INTO comments (content, post_id, user_id)
			VALUES ($1, $2, $3)
			RETURNING *
		`;
		const values = [content, postId, userId];

		const result = await pool.query(query, values);
		const newComment = result.rows[0];

		res.status(201).json(newComment);
	} catch (error) {
		console.error('Error creating comment:', error);
		res.status(500).json({ error: 'Error creating comment' });
	}
};

// Get all comments for a specific post
export const getCommentsByPost = async (req, res) => {
	try {
		const { postId } = req.params;

		if (!postId) {
			return res.status(400).json({ error: 'Post ID is required' });
		}

		const query = `
			SELECT *
			FROM comments
			WHERE post_id = $1
			ORDER BY created_at DESC
		`;
		const values = [postId];

		const result = await pool.query(query, values);
		const comments = result.rows;

		if (comments.length === 0) {
			return res.status(404).json({ message: 'No comments found for this post' });
		}

		res.status(200).json(comments);
	} catch (error) {
		console.error('Error fetching comments for post:', error);
		res.status(500).json({ error: 'Error fetching comments' });
	}
};

// Delete a comment
export const deleteComment = async (req, res) => {
	try {
		const commentId = req.params.id;
		const userId = req.user.id;

		// Check if the comment exists and belongs to the user
		const checkOwnershipQuery = 'SELECT user_id FROM comments WHERE id = $1';
		const checkResult = await pool.query(checkOwnershipQuery, [commentId]);

		if (checkResult.rows.length === 0) {
			return res.status(404).json({ error: 'Comment not found' });
		}

		if (checkResult.rows[0].user_id !== userId) {
			return res.status(403).json({ error: 'You can only delete your own comments' });
		}

		// Delete the comment
		const deleteQuery = 'DELETE FROM comments WHERE id = $1';
		await pool.query(deleteQuery, [commentId]);

		res.status(200).json({ message: 'Comment deleted successfully' });
	} catch (error) {
		console.error('Error deleting comment:', error);
		res.status(500).json({ error: 'Error deleting comment' });
	}
};

// Add like to a comment
export const addLikeToComment = async (req, res) => {
	try {
		const commentId = req.params.id;
		const userId = req.user.id;

		// Check if the comment exists
		const checkCommentQuery = 'SELECT * FROM comments WHERE id = $1';
		const commentResult = await pool.query(checkCommentQuery, [commentId]);

		if (commentResult.rows.length === 0) {
			return res.status(404).json({ error: 'Comment not found' });
		}

		// Update the like count in the comments table
		const updateLikeCountQuery = 'UPDATE comments SET likes = likes + 1 WHERE id = $1';
		await pool.query(updateLikeCountQuery, [commentId]);

		res.status(200).json({ message: 'Like added successfully' });
	} catch (error) {
		console.error('Error adding like to comment:', error);
		res.status(500).json({ error: 'Error adding like to comment' });
	}
};
