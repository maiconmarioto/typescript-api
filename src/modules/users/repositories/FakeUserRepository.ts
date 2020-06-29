import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/entities/typeorm/User';
import { uuid } from 'uuidv4';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), ...data });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const index = this.users.findIndex(u => u.id === user.id);

    this.users[index] = user;

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(u => u.id === id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(u => u.email === email);
    return user;
  }
}

export default FakeUserRepository;
