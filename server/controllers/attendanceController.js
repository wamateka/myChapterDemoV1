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
           SELECT a.attendance_id, a.status, a.checked_in_at, e.title, e.location, e.point_value, e.rsvp_count, m.first_name, m.last_name, r.status AS rsvp_status FROM attendance a
           LEFT JOIN events e ON a.event_id = e.event_id
           LEFT JOIN members m ON a.member_id = m.member_id
           LEFT JOIN rsvp r ON e.event_id = r.event_id
           WHERE a.event_id = ${eventId}
           GROUP BY a.attendance_id, e.title, e.location, e.point_value, e.rsvp_count, m.first_name, m.last_name, r.status;`;
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

export const addAttendanceRecord = async (req, res) => {
    const {member_id, event_id} = req.body;
    console.log(req.body)
    if (!member_id || !event_id) {
        console.log('member_id and event_id are required');
        return res.status(400).json({message: 'member_id and event_id are required'});
    }
    try {
        // Check if the attendance record already exists
        const existingRecord = await sql`
            SELECT * FROM attendance 
            WHERE member_id = ${member_id} AND event_id = ${event_id};`;
        if (existingRecord.length > 0) {
            console.log('Attendance record already exists for this member and event');
            return res.status(409).json({message: 'Attendance record already exists for this member and event'});
        }

        // Insert new attendance record
        const result = await sql`
            INSERT INTO attendance (member_id, event_id, status, checked_in_at)
            VALUES (${member_id}, ${event_id}, 'present', NOW())
            RETURNING *;`;
        
        res.status(201).json({message: 'Attendance record added successfully', data: result[0]});
    } catch (error) {
        console.error('Error adding attendance record:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}
