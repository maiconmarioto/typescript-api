import { Request, Response } from 'express';

class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    return response.json({ method: 'index' });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    return response.json({ method: id });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    return response.json({ method: 'create' });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    return response.json({ method: 'update' });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    return response.json({ method: 'delete' });
  }
}

export default UserController;
