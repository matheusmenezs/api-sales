import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IDeleteOrder } from '../domain/model/IShowOrder';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';

@injectable()
class DeleteOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async delete({ id }: IDeleteOrder): Promise<void> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }
    const products = order.order_products.map(product => ({
      id: product.product_id,
      quantity: product.quantity,
    }));

    const existsProducts = await this.productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const updatedProductQuantity = products.map(product => ({
      id: product.id,
      quantity:
        existsProducts.filter(p => p.id === product.id)[0].quantity +
        product.quantity,
    }));

    await this.productsRepository.updateStock(updatedProductQuantity);

    await this.ordersRepository.remove(order);
  }
}

export default DeleteOrderService;
