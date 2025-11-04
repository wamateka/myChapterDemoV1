import {sql} from '../db/dbConnection.js'

export const getRsvps = async (req,res) =>{
    const {id} = req.params

    try{
        const rsvps = await sql`
        SELECT m.member_id, m.first_name, m.last_name 
        FROM members m 
        JOIN rsvp r ON m.member_id = r.member_id 
        WHERE r.event_id = ${id}
        `
        res.status(200).json({ message: "success", data: rsvps[0] });
    }catch(error){
        console.log("error getting rsvp list: ", error)
        res.status(500).json(res.status(500).json({ message: "error", error: error.message }))
    }
}


export const getMemberRsvpStatus = async(req,res)=>{
    const event_id = parseInt(req.query.event_id,10)
    const member_id = parseInt(req.query.member_id, 10)
    
    try{
        var status = await sql`
        SELECT EXISTS (SELECT 1 FROM rsvp WHERE member_id = ${member_id} AND event_id = ${event_id})
        `
        if(!status[0].exists) return res.status(200).json({message: "success", data: {status: 'not attending'}})
        if(status){
            status = await sql`
            SELECT * FROM rsvp WHERE member_id = ${member_id} And event_id = ${event_id}
             `
            return res.status(200).json({message: "succes", data: status[0] })
        }

    }catch(error){
        console.log("Error getting status: ",error)
        return res.status(500).json({ message: "error", error: error.message });
    }
}

export const setMemberRsvpStatus = async(req,res) =>{
    const {member_id, event_id, status} = req.body

    try{
        const existingRsvp = await sql`
        SELECT * FROM rsvp WHERE member_id = ${member_id} AND event_id = ${event_id}
        `
        if(existingRsvp.length === 0){
            const newRsvp = await sql`
            INSERT INTO rsvp (member_id, event_id, status) VALUES (${member_id}, ${event_id}, ${status}) RETURNING *
            `
            return res.status(201).json({message: "success", data: newRsvp[0]})
        } else {
            const updatedRsvp = await sql`
            UPDATE rsvp SET status = ${status} WHERE member_id = ${member_id} AND event_id = ${event_id} RETURNING *
            `
            return res.status(200).json({message: "success", data: updatedRsvp[0]})
        }
    }catch(error){
        console.log("Error setting RSVP status: ", error)
        return res.status(500).json({ message: "error", error: error.message });
    }
}
