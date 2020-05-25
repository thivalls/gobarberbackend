import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserCreateDTO from '@modules/users/dtos/IUserCreateDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create({ name, email, password }: IUserCreateDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });
    await this.ormRepository.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  async save(user: User): Promise<User> {
    await this.ormRepository.save(user);
    return user;
  }

  async find(data: object): Promise<User[] | []> {
    const users = await this.ormRepository.find(data);
    return users;
  }
}

export default UsersRepository;
