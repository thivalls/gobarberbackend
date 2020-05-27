import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddAvatarService from '@modules/users/services/AddAvatarService';

export default class AvatarsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const avatarFilename = request.file.filename;
    const userId = request.user.id;

    const avatarService = container.resolve(AddAvatarService);

    const user = await avatarService.execute({ userId, avatarFilename });

    delete user.password;

    return response.json(user);
  }
}
