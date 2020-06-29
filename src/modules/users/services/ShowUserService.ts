import User from '@modules/users/entities/typeorm/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/repositories/typeorm/UserRepository';

class ShowUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async run(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findById(id);

    return user;
  }
}

export default ShowUserService;
