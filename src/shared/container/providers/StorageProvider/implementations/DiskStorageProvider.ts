import fs from 'fs';
import { resolve } from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiscStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    fs.promises.rename(
      resolve(uploadConfig.tempFolder, file),
      resolve(uploadConfig.uploadFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = resolve(uploadConfig.uploadFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch (error) {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiscStorageProvider;
