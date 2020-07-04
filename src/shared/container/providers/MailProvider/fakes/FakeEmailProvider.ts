import IEmailProvider from '../models/IEmailProvider';
import IMailSendDTO from '../dtos/ISendMailDTO';

class FakeEmailProvider implements IEmailProvider {
  private messages: IMailSendDTO[] = [];

  public async sendMail(message: IMailSendDTO): Promise<void> {
    this.messages.push(message);
  }
}

export default FakeEmailProvider;
