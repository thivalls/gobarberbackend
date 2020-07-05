import User from '../infra/typeorm/entities/User';
import IUserCreateDTO from '../dtos/IUserCreateDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  find(): Promise<User[]>;
  findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: IUserCreateDTO): Promise<User>;
  save(user: User): Promise<User>;
}
