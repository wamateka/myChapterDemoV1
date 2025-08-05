import {sql} from '../db/dbConnection.js';

export const getPointsLog = async (req, res) => {
    try {
        const pointsLog = await sql`
            SELECT * FROM PointsLog
            ORDER BY awarded_at DESC;
        `;
        res.status(200).json({message: 'success', data: pointsLog});
    } catch (error) {
        console.error('Error fetching points log:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}
export const getPointsByMemberId = async (req, res) => {
    const {memberId} = req.params;
    try {
        const results = await sql`
            SELECT * FROM PointsLog WHERE member_id = ${memberId} ORDER BY awarded_at DESC;`;
        if (results.length === 0) {
            return res.status(404).json({message: 'No points found for this member'});
        } else {
            res.status(200).json({message: 'success', data: results});
        }
    } catch (error) {
        console.error('Error fetching points by member ID:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}
export const addPoints = async (req, res) => {
    const {member_id, points, reason} = req.body;
    try {
        const newPoints = await sql`
            INSERT INTO PointsLog (member_id, points, reason)
            VALUES (${member_id}, ${points}, ${reason})
            RETURNING *;`;
        res.status(201).json({message: 'success', data: newPoints[0]});
    } catch (error) {
        console.error('Error adding points:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}
export const updatePoints = async (req, res) => {
    const {id} = req.params;
    const {member_id, points, reason} = req.body;
    try {
        const updatedPoints = await sql`
            UPDATE PointsLog
            SET member_id = ${member_id}, points = ${points}, reason = ${reason}
            WHERE points_log_id = ${id}
            RETURNING *;`;
        if (updatedPoints.length === 0) {
            return res.status(404).json({message: 'Points log not found'});
        } else {
            res.status(200).json({message: 'success', data: updatedPoints[0]});
        }
    } catch (error) {
        console.error('Error updating points:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}