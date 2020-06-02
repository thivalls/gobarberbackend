import { injectable, inject } from 'tsyringe';

import IEmailProvider from '@shared/container/providers/MailProvider/models/IEmailProvider';
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
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.emailProvider.sendMail(email, 'Este é o corpo do email');
  }
}

export default SendForgotPasswordEmailService;
