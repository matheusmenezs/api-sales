import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { IOrder } from '../domain/model/IOrder';
import { IRequestCreateOrder } from '../domain/model/IRequestCreateOrder';

@injectable()
class CreateOrderService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({
    customer_id,
    products,
  }: IRequestCreateOrder): Promise<IOrder> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const existsProducts = await this.productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds = existsProducts.map(product => product.id); //armazena os ids válidos encontrados

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
      ); //devolver primeiro id não encontrado
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await this.productsRepository.updateStock(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
