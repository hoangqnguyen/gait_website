import multer from 'multer';
import path from 'path';
import { spawn } from 'child_process';
import fs from 'fs';

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

const runPythonScript = (videoFilePath) => {
  return new Promise((resolve, reject) => {
    const processPython = spawn('python3', ['./scripts/process_video.py', videoFilePath]);

    let jsonData = '';

    processPython.stdout.on('data', (data) => {
      jsonData += data.toString();
    });

    processPython.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    processPython.on('close', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(jsonData);
          resolve(result);
        } catch (error) {
          reject(new Error('Failed to parse JSON from Python script'));
        }
      } else {
        reject(new Error('Failed to process video'));
      }
    });
  });
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      await new Promise((resolve, reject) => {
        upload.single('video')(req, res, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      const videoFilePath = path.join(process.cwd(), 'public', 'uploads', req.file.filename);
      const result = await runPythonScript(videoFilePath);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
