import { uuid } from 'uuidv4';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserCreateDTO from '@modules/users/dtos/IUserCreateDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    name,
    email,
    password,
  }: IUserCreateDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid(), name, email, password });
    this.users.push(user);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(usr => usr.email === email);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(usr => usr.id === id);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findUser = user;
    return findUser;
  }

  public async find(data: object): Promise<User[] | []> {
    return this.users;
  }
}

export default FakeUsersRepository;
