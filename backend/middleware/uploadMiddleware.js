import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'uploads/assets',
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

export const upload = multer({ storage });
