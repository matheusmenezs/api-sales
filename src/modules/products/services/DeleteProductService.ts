import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';
interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const product = await ProductsRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found.');
    }

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await ProductsRepository.remove(product);
  }
}

export default DeleteProductService;
