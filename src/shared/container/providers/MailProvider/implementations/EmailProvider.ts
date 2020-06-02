import IEmailProvider from '../models/IEmailProvider';

class EmailProvider implements IEmailProvider {
  public async sendEmail(to: string, body: string): Promise<void> {}
}

export default EmailProvider;
