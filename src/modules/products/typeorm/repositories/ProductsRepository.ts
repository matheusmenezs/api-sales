import { In } from 'typeorm';
import { dataSource } from '@shared/typeorm/datasource';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

export const ProductsRepository = dataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = await this.findOne({
      where: { name },
    });

    return product;
  },

  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existentProducts = await this.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  },
});
