import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productExists = await ProductsRepository.findByName(name);
    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const redisCache = new RedisCache();

    const product = ProductsRepository.create({ name, price, quantity });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await ProductsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
