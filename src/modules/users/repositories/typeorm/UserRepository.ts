import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '../IUserRepository';
import User from '../../entities/typeorm/User';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ ...data });
    await this.repository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: { email },
    });

    return user;
  }
}

export default UserRepository;
