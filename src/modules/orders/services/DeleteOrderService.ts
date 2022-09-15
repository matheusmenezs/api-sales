import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}

class DeleteOrderService {
  public async delete({ id }: IRequest): Promise<void> {
    const order = await OrdersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }
    const products = order.order_products.map(product => ({
      id: product.product_id,
      quantity: product.quantity,
    }));

    const existsProducts = await ProductsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const updatedProductQuantity = products.map(product => ({
      id: product.id,
      quantity:
        existsProducts.filter(p => p.id === product.id)[0].quantity +
        product.quantity,
    }));

    await ProductsRepository.save(updatedProductQuantity);

    await OrdersRepository.remove(order);
  }
}

export default DeleteOrderService;
