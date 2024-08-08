import multer from 'multer';
import path from 'path';
import nextConnect from 'next-connect';
import fs from 'fs';

// Configure Multer storage
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10000000 }, // Limit file size to 10MB
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    upload.single('video')(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Return the path to the uploaded file
      res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
