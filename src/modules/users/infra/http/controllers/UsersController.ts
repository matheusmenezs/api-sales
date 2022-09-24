import { Request, Response } from 'express';

import ListUserService from '@modules/users/services/ListUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ShowUserService from '@modules/users/services/ShowUserService';

import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';

export default class UserController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUserService);
    const users = await listUsers.execute();

    return response.json(instanceToInstance(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showUser = container.resolve(ShowUserService);
    const user = await showUser.execute({ id });

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, email, password });

    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const { id } = request.params;
    const updateUser = container.resolve(UpdateUserService);
    const user = await updateUser.execute({ id, name, email, password });

    return response.json(instanceToInstance(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUser = container.resolve(DeleteUserService);
    await deleteUser.execute(id);

    return response.json([]);
  }
}
