import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/entities/typeorm/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/repositories/typeorm/UserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async run({ name, email, password }: IRequest): Promise<User> {
    const emailInUse = await this.userRepository.findByEmail(email);

    if (emailInUse) {
      throw new AppError('E-mail address already in use.');
    }

    const passwordHash = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export default CreateUserService;
