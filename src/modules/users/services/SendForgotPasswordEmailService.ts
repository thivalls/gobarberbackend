import { injectable, inject } from 'tsyringe';

import IEmailProvider from '@shared/container/providers/MailProvider/models/IEmailProvider';
import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('EmailProvider')
    private emailProvider: IEmailProvider,

    @inject('UserTokenRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }

    await this.userTokensRepository.generate(user.id);

    this.emailProvider.sendMail(email, 'Este é o corpo do email');
  }
}

export default SendForgotPasswordEmailService;
