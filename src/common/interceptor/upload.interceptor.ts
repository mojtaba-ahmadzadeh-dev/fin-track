import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerStorage } from '../utils/multer.util';


export function UploadFile(fieldName: string, folderName: string = 'images') {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, { storage: multerStorage(folderName) })),
  );
}