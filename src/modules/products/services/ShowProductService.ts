import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IFindProducts } from '../domain/model/IFindProducts';
import { IProduct } from '../domain/model/IProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute({ id }: IFindProducts): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export default ShowProductService;
