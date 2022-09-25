import { Request, Response } from 'express';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import DeleteOrderService from '@modules/orders/services/DeleteOrderService';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import { container } from 'tsyringe';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    return response.json(order);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = container.resolve(DeleteOrderService);

    await deleteCustomer.delete({ id });

    return response.json([]);
  }
}
