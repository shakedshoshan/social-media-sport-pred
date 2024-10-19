import pool from '../db.js';

// Create a new chat message
export const createMessage = async (req, res) => {
    const { groupId, content } = req.body;
    const userId = req.user.id; // Assuming the user ID is available in req.user after authentication

    try {
        const newMessage = await pool.query(
            'INSERT INTO chat_messages (group_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
            [groupId, userId, content]
        );

        res.status(201).json({
            success: true,
            message: 'Chat message created successfully',
            chatMessage: newMessage.rows[0]
        });
    } catch (error) {
        console.error('Error creating chat message:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the chat message'
        });
    }
};

// Delete a chat message
export const deleteMessage = async (req, res) => {
    const { messageId } = req.params;
    const userId = req.user.id; // Assuming the user ID is available in req.user after authentication

    try {
        // First, check if the message exists and belongs to the user
        const message = await pool.query(
            'SELECT * FROM chat_messages WHERE id = $1 AND user_id = $2',
            [messageId, userId]
        );

        if (message.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Message not found or you do not have permission to delete it'
            });
        }

        // If the message exists and belongs to the user, delete it
        await pool.query('DELETE FROM chat_messages WHERE id = $1', [messageId]);

        res.status(200).json({
            success: true,
            message: 'Chat message deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting chat message:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the chat message'
        });
    }
};

// Get all chat messages for a group
export const getMessagesByGroupId = async (req, res) => {
    const { groupId } = req.params;

    try {
        const messages = await pool.query(
            `SELECT cm.id, cm.content, cm.created_at, u.id AS user_id, u.username, u.profilePic
             FROM chat_messages cm
             JOIN users u ON cm.user_id = u.id
             WHERE cm.group_id = $1
             ORDER BY cm.created_at ASC`,
            [groupId]
        );

        if (messages.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No messages found for this group'
            });
        }

        res.status(200).json({
            success: true,
            messages: messages.rows
        });
    } catch (error) {
        console.error('Error getting chat messages by group ID:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching chat messages for the group'
        });
    }
};
