import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class UploadService {
  getMulterConfig() {
    return {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file: Express.Multer.File, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          const filename = `${uniqueSuffix}${fileExt}`;
          cb(null, filename);
        },
      }),
    };
  }
}
