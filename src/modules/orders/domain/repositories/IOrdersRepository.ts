import { ICreateOrder } from '../model/ICreateOrder';
import { IOrder } from '../model/IOrder';

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | null>;
  createOrder(data: ICreateOrder): Promise<IOrder>;
  remove(order: IOrder): Promise<void>;
}
