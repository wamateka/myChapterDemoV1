import {sql} from  '../db/dbConnection.js';

export const getEvents = async (req, res) => {
    try {
        const events = await sql`
            SELECT * FROM Events
            ORDER BY start_datetime DESC;
        `;
        res.status(200).json({message: 'success', data: events});
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}
export const getEventById = async (req, res) => {
    const {id} = req.params;
    try {
        const results = await sql`
            SELECT * FROM Events WHERE event_id = ${id};`;
        if (results.length === 0) {
            return res.status(404).json({message: 'Event not found'});
        } else {
            res.status(200).json({message: 'success', data: results[0]});
        }
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}
export const addEvent = async (req, res) => {
    const {created_by_member_id, type, title, description, location, start_datetime, end_datetime, point_value} = req.body;
    try {
        const newEvent = await sql`
            INSERT INTO Events (created_by_member_id, type, title, description, location, start_datetime, end_datetime, point_value)
            VALUES (${created_by_member_id}, ${type}, ${title}, ${description}, ${location}, ${start_datetime}, ${end_datetime}, ${point_value})
            RETURNING *;`;
        res.status(201).json({message: 'success', data: newEvent[0]});
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}

export const updateEvent = async (req, res) => {
    const {id} = req.params;
    const {created_by_member_id, type, title, description, location, start_datetime, end_datetime, point_value} = req.body;
    try {
        const updatedEvent = await sql`
            UPDATE Events
            SET created_by_member_id = ${created_by_member_id}, type = ${type}, title = ${title}, description = ${description}, location = ${location}, start_datetime = ${start_datetime}, end_datetime = ${end_datetime}, point_value = ${point_value}
            WHERE event_id = ${id}
            RETURNING *;`;
        if (updatedEvent.length === 0) {
            return res.status(404).json({message: 'Event not found'});
        } else {
            res.status(200).json({message: 'success', data: updatedEvent[0]});
        }
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}

export const deleteEvent = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedEvent = await sql`
            DELETE FROM Events WHERE event_id = ${id} RETURNING *;`;
        if (deletedEvent.length === 0) {
            return res.status(404).json({message: 'Event not found'});
        } else {
            res.status(200).json({message: 'success', data: deletedEvent[0]});
        }
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}  

export const getEventsByMember = async (req, res) => {
    const {member_id} = req.params;
    try {
        const results = await sql`
            SELECT * FROM Events WHERE created_by_member_id = ${member_id}
            ORDER BY start_datetime DESC;`;
        if (results.length === 0) {
            return res.status(404).json({message: 'No events found for this member'});
        } else {
            res.status(200).json({message: 'success', data: results});
        }
    } catch (error) {
        console.error('Error fetching events by member:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}