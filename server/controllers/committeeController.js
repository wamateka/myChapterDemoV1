import {sql} from '../db/dbConnection.js';

export const getCommittees = async (req, res) => {
    try {
        const committees = await sql`
            SELECT * FROM Committees
            ORDER BY name;
        `;
        res.status(200).json({message: 'success', data: committees});
    } catch (error) {
        console.error('Error fetching committees:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}
export const getCommitteeById = async (req, res) => {
    const {id} = req.params;
    try {
        const results = await sql`
            SELECT * FROM Committees WHERE committee_id = ${id};`;
        if (results.length === 0) {
            return res.status(404).json({message: 'Committee not found'});
        } else {
            res.status(200).json({message: 'success', data: results[0]});
        }
    } catch (error) {
        console.error('Error fetching committee:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}
export const getCommitteesByZone = async (req, res) => {
    const {zoneId} = req.params;
    try {
        const results = await sql`
            SELECT * FROM Committees WHERE zone_id = ${zoneId} ORDER BY name;`;
        if (results.length === 0) {
            return res.status(404).json({message: 'No committees found for this zone'});
        } else {
            res.status(200).json({message: 'success', data: results});
        }
    } catch (error) {
        console.error('Error fetching committees by zone:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}

export const getCommitteeMembers = async (req, res) => {
    const {committeeId} = req.params;
    try {
        const results = await sql`
            SELECT * FROM CommitteeMembers WHERE committee_id = ${committeeId} ORDER BY member_id;`;
        if (results.length === 0) {
            return res.status(404).json({message: 'No members found for this committee'});
        } else {
            res.status(200).json({message: 'success', data: results});
        }
    } catch (error) {
        console.error('Error fetching committee members:', error);
        res.status(500).json({message: 'error', error: error.message});
    }
}