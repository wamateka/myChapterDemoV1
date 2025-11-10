import { sql } from "../db/dbConnection.js";
import { upload } from "../util/cloudinary.js";
import { generateCheckinCode as generateCode } from "../util/checkinCodegen.js";
export const getEvents = async (req, res) => {
  try {
    const events = await sql`
            SELECT e.*, COUNT(a.attendance_id) as attendee_count
            FROM events e
            LEFT JOIN attendance a ON e.event_id = a.event_id AND a.status = 'present'
            GROUP BY e.event_id, e.title, e.start_datetime, e.end_datetime
            ORDER BY e.start_datetime DESC
        `;
    res.status(200).json({ message: "success", data: events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};
export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await sql`
            SELECT * FROM Events WHERE event_id = ${id};`;
    if (results.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    } else {
      res.status(200).json({ message: "success", data: results[0] });
    }
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};
export const addEvent = async (req, res) => {
  const {
    created_by_member_id,
    type,
    title,
    description,
    location,
    start_datetime,
    end_datetime,
    point_value,
    max_attendee,
  } = req.body;
  const fileBase64 = `data:${
    req.file.mimetype
  };base64,${req.file.buffer.toString("base64")}`;
  const fileName = req.file.originalname;
  try {
    console.log("uploading poster image ...");
    const url = await upload(fileBase64, fileName, "posters");
    console.log("image uploaded successfully: ", url);
    const newEvent = await sql`
            INSERT INTO Events (created_by_member_id, type, title, description, location, start_datetime, end_datetime, point_value, max_attendee, poster_img_url)
            VALUES (${created_by_member_id}, ${type}, ${title}, ${description}, ${location}, ${start_datetime}, ${end_datetime}, ${point_value}, ${max_attendee}, ${url})
            RETURNING *;`;
    res.status(201).json({ message: "success", data: newEvent[0] });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const {id} = req.params;
  let {
    created_by_member_id,
    type,
    title,
    description,
    location,
    start_datetime,
    end_datetime,
    point_value,
    max_attendee,
    poster_img_url,
  } = req.body;
  // console.log(req.file);

  try {
    if (req.file) {
      const fileBase64 = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;
      const fileName = req.file.originalname;
      poster_img_url =await upload(fileBase64, fileName, "posters");
    }
    const updatedEvent = await sql`
            UPDATE Events
            SET created_by_member_id = ${created_by_member_id}, 
            type = ${type}, title = ${title}, 
            description = ${description}, 
            location = ${location}, 
            start_datetime = ${start_datetime}, 
            end_datetime = ${end_datetime}, 
            point_value = ${point_value}, 
            max_attendee = ${max_attendee}, 
            poster_img_url = ${poster_img_url} 
            WHERE event_id = ${id}
            RETURNING *;`;
    if (updatedEvent.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    } else {
      res.status(200).json({ message: "success", data: updatedEvent[0] });
    }
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await sql`
            DELETE FROM Events WHERE event_id = ${id} RETURNING *;`;
    if (deletedEvent.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    } else {
      res.status(200).json({ message: "success", data: deletedEvent[0] });
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};

export const getEventsByMember = async (req, res) => {
  const { member_id } = req.params;
  try {
    const results = await sql`
            SELECT * FROM Events WHERE created_by_member_id = ${member_id}
            ORDER BY start_datetime DESC;`;
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for this member" });
    } else {
      res.status(200).json({ message: "success", data: results });
    }
  } catch (error) {
    console.error("Error fetching events by member:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};

export const generateCheckinCode = async (req, res) => {
  const { id } = req.params;
  try{
    const checkin_code = generateCode(6);
    await sql`
      UPDATE Events
      SET checkin_code = ${checkin_code}
      WHERE event_id = ${id};
    `;
    res.status(200).json({message: "success", checkin_code});
  } catch (error) {
    console.error("Error generating checkin code:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
}