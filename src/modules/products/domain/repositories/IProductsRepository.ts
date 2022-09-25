import { ICreateProduct } from '../model/ICreateProduct';
import { IFindProducts } from '../model/IFindProducts';
import { IProduct } from '../model/IProduct';
import { IUpdateStock } from '../model/IUpdateStock';

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | null>;
  findById(id: string): Promise<IProduct | null>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
  findAll(): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  updateStock(products: IUpdateStock[]): Promise<void>;
  remove(product: IProduct): Promise<void>;
}
