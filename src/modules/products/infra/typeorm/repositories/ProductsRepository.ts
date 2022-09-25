import { In, Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm/datasource';
import Product from '../entities/Product';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IProduct } from '@modules/products/domain/model/IProduct';
import { IFindProducts } from '@modules/products/domain/model/IFindProducts';
import { ICreateProduct } from '@modules/products/domain/model/ICreateProduct';
import { IUpdateStock } from '@modules/products/domain/model/IUpdateStock';

export class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<IProduct>;
  constructor() {
    this.ormRepository = dataSource.getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: IProduct): Promise<IProduct> {
    await this.ormRepository.save(product);

    return product;
  }

  public async updateStock(products: IUpdateStock[]): Promise<void> {
    await this.ormRepository.save(products);
  }

  public async remove(product: IProduct): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async findByName(name: string): Promise<IProduct | null> {
    const product = await this.ormRepository.findOneBy({ name });

    return product;
  }

  public async findById(id: string): Promise<IProduct | null> {
    const product = await this.ormRepository.findOneBy({ id });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<IProduct[]> {
    const productIds = products.map(product => product.id);

    const existentProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  }

  public async findAll(): Promise<IProduct[]> {
    const products = await this.ormRepository.find();

    return products;
  }
}
