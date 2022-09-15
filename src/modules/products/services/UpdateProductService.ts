import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const product = await ProductsRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found.');
    }
    const productExists = await ProductsRepository.findByName(name);
    if (productExists && name != product.name) {
      throw new AppError('There is already one product with this name');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await ProductsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
