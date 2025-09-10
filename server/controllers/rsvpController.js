import {sql} from '../db/dbConnection.js'

export const getRsvps = async (req,res) =>{
    const {event_id} = req.query
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

