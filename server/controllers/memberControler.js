import { sql } from "../db/dbConnection.js";
import bcrypt from "bcrypt";
import { upload } from "../util/cloudinary.js";
const SALT_ROUNDS = 5;
export const getMembers = async (req, res) => {
  try {
    const members = await sql`
            SELECT 
              m.*,
              COALESCE(SUM(p.points), 0) AS total_points
              FROM Members m
              LEFT JOIN pointslog p ON m.member_id = p.member_id
              GROUP BY m.member_id
              ORDER BY m.last_name, m.first_name;
        `;
    res.status(200).json({ message: "success", data: members });
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};
export const getMembersList = async (req, res) => {
  try {
    const members = await sql`
            SELECT member_id, first_name, last_name FROM Members
            ORDER BY last_name, first_name;
        `;
    res.status(200).json({ message: "success", data: members });
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};
export const getMemberCount = async (req, res) => {
  try {
    const count = await sql`
        SELECT COUNT(*)
        FROM members;
    `;
    res.status(200).json({ message: "success", data: count[0] });
  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).json({ message: "error", error: err.message });
  }
};
export const getLeaderboard = async (req, res) => {
  try {
    const list = await sql`
            SELECT m.member_id, m.first_name, m.last_name, COALESCE(SUM(p.points), 0) AS total_points
            FROM members m
            LEFT JOIN pointslog p ON m.member_id = p.member_id
            GROUP BY m.member_id, m.first_name, m.last_name
            ORDER BY total_points DESC;
        `;
    res.status(200).json({ message: "success", data: list });
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};
export const getMemberStats = async (req, res) => {
  const { id } = req.params;
  try {
    const stats = await sql`
    SELECT  m.member_id, COALESCE(SUM(p.points), 0) AS total_points, COUNT(DISTINCT a.event_id) AS events_attended
    FROM members m
    LEFT JOIN pointslog p ON m.member_id = p.member_id
    LEFT JOIN attendance a ON m.member_id = a.member_id AND a.status = 'present'
    WHERE m.member_id = ${id}
    GROUP BY m.member_id    
    `;
    const eventCount = await sql`
   SELECT COUNT(*) 
   FROM attendance 
   WHERE member_id = ${id} AND status = 'present'
    `;
    res.status(200).json({ message: "success get points", data: stats[0] });
  } catch (error) {
    console.log("error getting user points:, ", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};
export const getMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await sql`
            SELECT * FROM Members WHERE member_id = ${id};`;
    if (results.length === 0) {
      return res.status(404).json({ message: "Member not found" });
    } else {
      return res.status(200).json({ message: "success", data: results[0] });
    }
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};
export const getMemberByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const results = await sql`
            SELECT * FROM Members WHERE email = ${email};`;
    res.status(200).json({ message: "success", data: results[0] });
  } catch (error) {
    console.error("Error fetching member by email:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await sql`
    SELECT 
    m.first_name,
    m.last_name,
    m.profile_picture,
    m.year_in_college,
    m.email,
    m.phone_number,
    m.nsbe_id,
    m.nsbe_membership_type,
    m.major,
    m.graduation_year,
    m.local_dues,
    m.national_dues,
    STRING_AGG(DISTINCT c.name || '-' || cm.role, ', ') AS committees,
    STRING_AGG(DISTINCT e.title, ', ') AS eboard_position,
    z.name AS zone_name
    
FROM 
    members m
LEFT JOIN 
    committeemembership cm ON m.member_id = cm.member_id
LEFT JOIN 
    committees c ON cm.committee_id = c.committee_id
LEFT JOIN 
    eboard e ON m.member_id = e.member_id
LEFT JOIN
    zones z ON e.zone_id = z.zone_id
WHERE 
    m.member_id = ${id}
GROUP BY 
    m.member_id, m.first_name, m.last_name, m.profile_picture, m.year_in_college, 
    m.email, m.phone_number, m.nsbe_id, m.nsbe_membership_type, m.major, m.graduation_year, z.name
    `;
    if (results.length === 0) {
      return res.status(404).json({ message: "Member not found" });
    } else {
      res.status(200).json({ message: "success", data: results[0] });
    }
  } catch (error) {
    console.log("Error fecthing profile: ", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};
export const addMember = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const checkEmail = await sql`
            SELECT * FROM Members WHERE email = ${email};`;

    if (checkEmail.length > 0) {
      return res
        .status(400)
        .json({ message: "Email already exists. Try logging in." });
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
    console.error("Error adding member:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};

export const updateMember = async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    email,
    phone_number,
    role,
    nsbe_id,
    membership_type,
    major,
    college_year,
    graduation_year,
    local_dues,
    national_dues,
  } = req.body;
  try {
    const updatedMember = await sql`
            UPDATE Members
            SET 
            nsbe_id = ${nsbe_id}, 
            first_name = ${first_name}, 
            last_name = ${last_name}, 
            email = ${email},
            phone_number = ${phone_number},
            role = ${role},
            graduation_year = ${graduation_year}, 
            major = ${major},
            year_in_college = ${college_year},
            local_dues = ${local_dues},
            national_dues = ${national_dues},
            nsbe_membership_type = ${membership_type}
            WHERE member_id = ${id}
            RETURNING *;`;
    if (updatedMember.length === 0) {
      return res.status(404).json({ message: "Member not found" });
    } else {
      res.status(200).json({ message: "success", data: updatedMember[0] });
    }
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};

export const updateProfilePicture = async (req, res) => {
  const { id } = req.params;
  const fileBase64 = `data:${
    req.file.mimetype
  };base64,${req.file.buffer.toString("base64")}`;
  const fileName = req.file.originalname;
  try {
    console.log("changing profile picture...");
    const url = await upload(fileBase64, fileName, "profile_pictures");
    console.log("picture updated successfully✅: ", url);

    const newPic = await sql`
    UPDATE members
    SET 
    profile_picture = ${url}
    WHERE member_id = ${id}
    RETURNING *;
    `;
    res.status(200).json({ message: "success", data: url });
  } catch (error) {
    console.log("error saving picture: ", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};

export const deleteMember = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMember = await sql`
            DELETE FROM Members WHERE member_id = ${id} RETURNING *;`;
    if (deletedMember.length === 0) {
      return res.status(404).json({ message: "Member not found" });
    } else {
      res.status(200).json({ message: "success", data: deletedMember[0] });
    }
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};
