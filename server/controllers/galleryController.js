import { sql } from "../db/dbConnection.js";
import { upload } from "../util/cloudinary.js";

export const getGalleryImages = async (req, res) => {
  try {
    const images = await sql`
            SELECT * FROM GalleryImages
            ORDER BY uploaded_at DESC;
        `;
    res.status(200).json({ message: "success", data: images });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};

export const getGalleryImageById = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await sql`
            SELECT * FROM GalleryImages WHERE gallery_image_id = ${id};`;
    if (results.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    } else {
      res.status(200).json({ message: "success", data: results[0] });
    }
  } catch (error) {
    console.error("Error fetching gallery image:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};

export const getGalleryImageByMemberId = async (req, res) => {
  const { memberId } = req.params;
  try {
    const results = await sql`
            SELECT * FROM GalleryImages WHERE member_id = ${memberId} ORDER BY uploaded_at DESC;`;
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No images found for this member" });
    } else {
      res.status(200).json({ message: "success", data: results });
    }
  } catch (error) {
    console.error("Error fetching gallery images by member:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};

export const addGalleryImage = async (req, res) => {
  const { memberId,caption } = req.body;
  console.log(req.body)
  const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
  const fileName = req.file.originalname

  try {
    console.log("uploading image ...");
    // console.log(fileBase64)
    const url = await upload(fileBase64,fileName);
    console.log("image uploaded susccefully:",url);    
    const newImage = await sql`
            INSERT INTO GalleryImages (member_id, image_url, caption)
            VALUES (${memberId}, ${url}, ${caption})
            RETURNING *;`;
    res.status(201).json({ message: "success", data: newImage[0] });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};

export const updateGalleryImage = async (req, res) => {
  const { id } = req.params;
  const { member_id, image_url, caption } = req.body;
  try {
    const updatedImage = await sql`
            UPDATE GalleryImages
            SET member_id = ${member_id}, image_url = ${image_url}, caption = ${caption}
            WHERE gallery_image_id = ${id}
            RETURNING *;`;
    if (updatedImage.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    } else {
      res.status(200).json({ message: "success", data: updatedImage[0] });
    }
  } catch (error) {
    console.error("Error updating gallery image:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};

export const deleteGalleryImage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedImage = await sql`
            DELETE FROM GalleryImages WHERE gallery_image_id = ${id} RETURNING *;`;
    if (deletedImage.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    } else {
      res.status(200).json({ message: "success", data: deletedImage[0] });
    }
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};
