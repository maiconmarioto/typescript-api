import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

class UserController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showUser = new ShowUserService();
    const user = await showUser.run(id);
    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.run({ name, email, password });
    user.password = '';
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userData = request.body;
    const updateUser = new UpdateUserService();
    const user = updateUser.run(userData);
    return response.json(user);
  }
}

export default UserController;
