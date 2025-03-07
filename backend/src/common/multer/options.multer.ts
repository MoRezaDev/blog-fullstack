import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 } from 'uuid';

export const imagesOptions: MulterOptions = {
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = extname(file.originalname);
    if (!ext.match(/.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only images are allowed'), false);
    }
    cb(null, true);
  },
  storage: diskStorage({
    destination(req, file, callback) {
      const path = join(process.cwd(), 'src', 'public', 'temp');
      if (!existsSync(path)) {
        mkdirSync(path);
      }
      callback(null, path);
    },
    filename(req, file, callback) {
      const ext = extname(file.originalname);
      const filename =
        req.originalUrl === '/post/upload-image-title'
          ? `title-${v4().slice(0, 12)}`
          : v4().slice(0, 12);
      callback(null, `${filename}${ext}`);
    },
  }),
};
