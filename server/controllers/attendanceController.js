import {sql} from '../db/dbConnection.js';

export const getAttendances = async (req, res) => {
    try {
        const attendanceRecords = await sql`
            SELECT * FROM attendance
            ORDER BY event_id, member_id;
        `;
        res.status(200).json({message: 'success', data: attendanceRecords});
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}

export const getAttendanceById = async (req, res) => {
    const {id} = req.params;
    try {
        const results = await sql`
            SELECT * FROM attendance WHERE attendance_id = ${id};`;
        if (results.length === 0) {
            return res.status(404).json({message: 'Attendance record not found'});
        } else {
            res.status(200).json({message: 'success', data: results[0]});
        }
    } catch (error) {
        console.error('Error fetching attendance record:', error);
        res.status(500).json({message: 'error', error: error.message});
    }   
}


export const getAttendancesByEventId = async (req, res) => {
    const {eventId} = req.params;
    try {
        const results = await sql`
            SELECT * 
            FROM attendance a
            JOIN events e ON a.event_id = e.event_id
            JOIN members m ON a.member_id = m.member_id
            WHERE a.event_id = ${eventId};`;
            res.status(200).json({message: 'success', data: results});
    } catch (error) {
        console.error('Error fetching attendance by event ID:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}

export const getAttendancesByMemberId = async (req, res) => {
    const {memberId} = req.params;
    try {
        const results = await sql`
            SELECT * 
            FROM attendance a
            JOIN members m ON a.member_id = m.member_id
            JOIN events e ON a.event_id = e.event_id
            WHERE member_id = ${memberId} 
            ORDER BY event_id;`;
        if (results.length === 0) {
            return res.status(404).json({message: 'No attendance records found for this member'});
        } else {
            res.status(200).json({message: 'success', data: results});
        }
    } catch (error) {
        console.error('Error fetching attendance by member ID:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}

export const getAttendanceByStatus = async (req, res) => {
    const {status} = req.params;
    try {
        const results = await sql`
            SELECT * 
            FROM attendance 
            WHERE status = ${status};`;
        if (results.length === 0) {
            return res.status(404).json({message: 'No attendance records found for this status'});
        } else {
            res.status(200).json({message: 'success', data: results});
        }
    } catch (error) {
        console.error('Error fetching attendance by status:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}

