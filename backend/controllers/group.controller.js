import pool from '../db.js';
import { v4 as uuidv4 } from 'uuid';

// Create a new group
export const createGroup = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id; // Assuming you have user information in the request

    try {
        let secretCode;
        let isUnique = false;

        while (!isUnique) {
            // Generate a 6-character secret code
            secretCode = uuidv4().substr(0, 6).toUpperCase();

            // Check if the secret code already exists
            const existingGroup = await pool.query(
                'SELECT * FROM groups WHERE secret_code = $1',
                [secretCode]
            );

            if (existingGroup.rows.length === 0) {
                isUnique = true;
            }
        }

        // Insert the new group into the database
        const newGroup = await pool.query(
            'INSERT INTO groups (name, secret_code) VALUES ($1, $2) RETURNING *',
            [name, secretCode]
        );

        // Add the creator to the group
        await pool.query(
            'INSERT INTO user_groups (user_id, group_id) VALUES ($1, $2)',
            [userId, newGroup.rows[0].id]
        );

        res.status(201).json({
            success: true,
            message: 'Group created successfully',
            group: newGroup.rows[0]
        });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the group'
        });
    }
};


export const joinGroup = async (req, res) => {
    const { secretCode } = req.body;
    console.log(secretCode);
    const userId = req.user.id; // Assuming you have user information in the request

    try {
        // Find the group with the given secret code
        const group = await pool.query(
            'SELECT * FROM groups WHERE secret_code = $1',
            [secretCode]
        );

        if (group.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Group not found'
            });
        }

        const groupId = group.rows[0].id;

        // Check if the user is already a member of the group
        const existingMembership = await pool.query(
            'SELECT * FROM user_groups WHERE user_id = $1 AND group_id = $2',
            [userId, groupId]
        );

        if (existingMembership.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'You are already a member of this group'
            });
        }

        // Add the user to the group
        await pool.query(
            'INSERT INTO user_groups (user_id, group_id) VALUES ($1, $2)',
            [userId, groupId]
        );

        res.status(200).json({
            success: true,
            message: 'Successfully joined the group',
            group: group.rows[0]
        });
    } catch (error) {
        console.error('Error joining group:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while joining the group'
        });
    }
};

// Get all users by group ID
export const getUsersByGroupId = async (req, res) => {
    const { groupId } = req.params;

    try {
        const users = await pool.query(
            `SELECT u.id, u.username, u.profilePic, ug.score
             FROM users u
             JOIN user_groups ug ON u.id = ug.user_id
             WHERE ug.group_id = $1
             ORDER BY ug.score DESC, ug.joined_at ASC`,
            [groupId]
        );

        if (users.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No users found for this group'
            });
        }

        res.status(200).json({
            users: users.rows
        });
    } catch (error) {
        console.error('Error getting users by group ID:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching users for the group'
        });
    }
};

// Get all group IDs by user ID
export const getGroupIdsByUserId = async (req, res) => {
    const userId = req.user.id; // Assuming the user ID is available in req.user after authentication

    try {
        const groups = await pool.query(
            `SELECT g.id, g.name
             FROM groups g
             JOIN user_groups ug ON g.id = ug.group_id
             WHERE ug.user_id = $1
             ORDER BY ug.joined_at DESC`,
            [userId]
        );

        if (groups.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No groups found for this user'
            });
        }

        const groupList = groups.rows.map(row => ({ id: row.id, name: row.name }));

        res.status(200).json({
            success: true,
            groups: groupList
        });
    } catch (error) {
        console.error('Error getting groups by user ID:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching groups for the user'
        });
    }
};

// Get group details by group ID
export const getGroupDetailsById = async (req, res) => {
    const groupId = req.params.groupId;

    try {
        const groupDetails = await pool.query(
            `SELECT id, name, created_at
             FROM groups
             WHERE id = $1`,
            [groupId]
        );

        if (groupDetails.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Group not found'
            });
        }

        const group = groupDetails.rows[0];

        res.status(200).json({
            success: true,
            group: {
                id: group.id,
                name: group.name,
                createdAt: group.created_at
            }
        });
    } catch (error) {
        console.error('Error getting group details:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching group details'
        });
    }
};






