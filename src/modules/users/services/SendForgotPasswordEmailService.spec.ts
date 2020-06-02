import FakeEmailProvider from '@shared/container/providers/MailProvider/fakes/FakeEmailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('Should be able to recover password using email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeEmailProvider = new FakeEmailProvider();
    const sendForgotPassowordEmailServices = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeEmailProvider,
    );

    const sendMail = jest.spyOn(fakeEmailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPassowordEmailServices.execute({
      email: 'johndoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
    expect(sendMail).toHaveBeenCalledWith(
      'johndoe@example.com',
      'Este é o corpo do email',
    );
  });
});
