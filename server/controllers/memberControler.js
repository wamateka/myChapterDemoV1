import { sql } from '../db/dbConnection.js';
import bcrypt from 'bcrypt';
const SALT_ROUNDS = 5;
export const getMembers = async (req, res) => {
    try {
        const members = await sql`
            SELECT * FROM Members
            ORDER BY last_name, first_name;
        `;
        res.status(200).json({ message: 'success', data: members });
    } catch (error) {
        console.error('Error fetching members:', error);
        res.status(500).json({ message: 'error', error: error.message });
    }
}

export const getMemberById = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await sql`
            SELECT * FROM Members WHERE member_id = ${id};`
        if (results.length === 0) {
            return res.status(404).json({ message: 'Member not found' });
        } else {
            res.status(200).json({ message: 'success', data: results[0] });
        }
    } catch (error) {
        console.error('Error fetching member:', error);
        res.status(500).json({ message: 'error', error: error.message });
    }
}
export const getMemberByEmail = async (req,res) => {
    const {email} = req.params;
    try {
        const results = await sql`
            SELECT * FROM Members WHERE email = ${email};`
            res.status(200).json({ message: 'success', data: results[0] });
    } catch (error) {
        console.error('Error fetching member by email:', error);
        res.status(500).json({ message: 'error', error: error.message });
    }
}
export const addMember = async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const checkEmail = await sql`
            SELECT * FROM Members WHERE email = ${email};`;

        if (checkEmail.length > 0) {
            return res.status(400).json({ message: 'Email already exists. Try logging in.' });
        }
        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        const newMember = await sql`
                INSERT INTO Members (first_name, last_name, email, login_password)
                 VALUES (${first_name}, ${last_name}, ${email}, ${hash})
                 RETURNING *;`;
            //    res.status(201).json({ message: 'success', data: newMember[0] });
        req.user = newMember[0];
        next();
    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).json({ message: 'error', error: error.message });
    }
}

export const updateMember = async (req, res) => {
    const { id } = req.params;
    const { nsbe_id, first_name, last_name, email, graduation_year, major, role, locals_dues, national_dues } = req.body;
    try {
        const updatedMember = await sql`
            UPDATE Members
            SET nsbe_id = ${nsbe_id}, first_name = ${first_name}, last_name = ${last_name}, email = ${email}, graduation_year = ${graduation_year}, major = ${major}, role = ${role}, locals_dues = ${locals_dues}, national_dues = ${national_dues}
            WHERE member_id = ${id}
            RETURNING *;`;
        if (updatedMember.length === 0) {
            return res.status(404).json({ message: 'Member not found' });
        } else {
            res.status(200).json({ message: 'success', data: updatedMember[0] });
        }
    } catch (error) {
        console.error('Error updating member:', error);
        res.status(500).json({ message: 'error', error: error.message });
    }
}

export const deleteMember = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMember = await sql`
            DELETE FROM Members WHERE member_id = ${id} RETURNING *;`;
        if (deletedMember.length === 0) {
            return res.status(404).json({ message: 'Member not found' });
        } else {
            res.status(200).json({ message: 'success', data: deletedMember[0] });
        }
    } catch (error) {
        console.error('Error deleting member:', error);
        res.status(500).json({ message: 'error', error: error.message });
    }
}




