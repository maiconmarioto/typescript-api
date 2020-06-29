import { compare, hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/entities/typeorm/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/repositories/typeorm/UserRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
}

class UpdateUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async run(data: IRequest): Promise<User | undefined> {
    const user = await this.userRepository.findById(data.id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const emailInUse = await this.userRepository.findByEmail(data.email);

    if (emailInUse && emailInUse.id !== data.id) {
      throw new AppError('E-mail already in use.');
    }

    if (data.password && !data.oldPassword) {
      throw new AppError('Old password is not filled');
    }

    if (data.password && data.oldPassword) {
      const comparedPassword = await compare(data.oldPassword, user.password);

      if (!comparedPassword) {
        throw new AppError('Old password dont match');
      }
    }

    if (data.password) {
      user.password = await hash(data.password, 8);
    }

    user.name = data.name;
    user.email = data.email;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
