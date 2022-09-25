import Order from '../entities/Order';
import { dataSource } from '@shared/infra/typeorm/datasource';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { Repository } from 'typeorm';
import { IOrder } from '@modules/orders/domain/model/IOrder';
import { ICreateOrder } from '@modules/orders/domain/model/ICreateOrder';

export class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<IOrder>;
  constructor() {
    this.ormRepository = dataSource.getRepository(Order);
  }
  public async findById(id: string): Promise<IOrder | null> {
    const order = this.ormRepository.findOne({
      where: { id },
      relations: ['order_products', 'customer'],
    });
    return order;
  }

  public async createOrder({
    customer,
    products,
  }: ICreateOrder): Promise<IOrder> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }

  public async remove(order: IOrder): Promise<void> {
    await this.ormRepository.remove(order);
  }
}
