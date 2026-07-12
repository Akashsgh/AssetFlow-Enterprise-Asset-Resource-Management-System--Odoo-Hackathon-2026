import multer from 'multer';
import path from 'path';

const assetStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'uploads/assets/'),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `asset-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const documentStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'uploads/documents/'),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `doc-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (_req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);
  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Only images and documents are allowed'));
  }
};

export const uploadAssetImage = multer({
  storage: assetStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
}).single('image');

export const uploadDocument = multer({
  storage: documentStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter
}).single('document');
