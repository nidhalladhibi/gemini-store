import cloudinary from "../config/cloudinary.js";

export async function uploadImages(req, res, next) {
  try {
    if (!req.files?.length) return res.status(400).json({ message: "No files uploaded" });
    const uploads = await Promise.all(req.files.map((file) => uploadBuffer(file.buffer)));
    res.status(201).json(uploads.map((item) => ({ url: item.secure_url, publicId: item.public_id })));
  } catch (error) {
    next(error);
  }
}

function uploadBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "gemini-store" }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(buffer);
  });
}
