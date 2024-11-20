// import { NextApiHandler, NextApiRequest } from "next";
// import formidable from "formidable";
// import path from "path";
// import fs from "fs/promises";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// let newName 

// const readFile = (req,saveLocally) => {
//     const options = {};
//     if (saveLocally) {
//         options.uploadDir = path.join(process.cwd(), "/public/uploads");
//         options.filename = (name, ext, path, form) => {
//             newName = Date.now().toString() + "_" + path.originalFilename;
//             return newName
//         };
//     }
//     options.maxFileSize = 5000 * 1024 * 1024;
//     const form = formidable(options);
//     return new Promise((resolve, reject) => {
//         form.parse(req, (err, fields, files) => {
//             if (err) reject(err);
//             resolve({ fields, files });
//         });
//     });
// };

// const handler = async (req, res) => {
//     try {
//         await fs.readdir(path.join(process.cwd() + "/public", "/uploads"));
//     } catch (error) {
//         await fs.mkdir(path.join(process.cwd() + "/public", "/uploads"));
//     }
//     const ans = await readFile(req, true);
//     res.json({ done: "ok", name: newName });
// };

// export default handler;


// Here’s a safer implementation of your file upload API with enhanced validations and mitigations for potential issues:

import { NextApiHandler } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

// Disable Next.js body parser for this API route
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to handle file upload
const readFile = (req, saveLocally) => {
  const options = {
    maxFileSize: 50 * 1024 * 1024, // Limit file size to 50 MB
    allowEmptyFiles: false,       // Disallow empty files
    filter: ({ mimetype }) => {
      // Validate allowed file types (e.g., images and PDFs)
      return (
        mimetype &&
        ["image/png", "image/jpeg", "application/pdf"].includes(mimetype)
      );
    },
  };

  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/uploads");
    options.filename = (name, ext, filePath, form) => {
      const timestamp = Date.now();
      const sanitizedFilename = path
        .basename(filePath.originalFilename)
        .replace(/[^a-zA-Z0-9._-]/g, "_"); // Sanitize the filename
      return `${timestamp}_${sanitizedFilename}`;
    };
  }

  const form = formidable(options);

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err); // Handle errors (e.g., file too large or invalid type)
      resolve({ fields, files });
    });
  });
};

const handler = async (req, res) => {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Ensure the "uploads" directory exists
    const uploadDir = path.join(process.cwd(), "/public/uploads");
    try {
      await fs.readdir(uploadDir);
    } catch (error) {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Process the file upload
    const { files } = await readFile(req, true);

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ error: "No files were uploaded" });
    }

    const uploadedFile = files.file || Object.values(files)[0];
    const filePath = uploadedFile.filepath || uploadedFile.path;
    const fileName = uploadedFile.newFilename || path.basename(filePath);

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      fileName,
      filePath: `/uploads/${fileName}`, // Public path to the uploaded file
    });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
