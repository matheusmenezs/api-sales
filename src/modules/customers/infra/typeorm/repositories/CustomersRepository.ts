import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { Repository } from 'typeorm';
import Customer from '../entities/Customer';
import { dataSource } from '@shared/infra/typeorm/datasource';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Customer);
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer);

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  public async findAll(): Promise<Customer[]> {
    const customers = await this.ormRepository.find();
    return customers;
  }

  public async findByName(name: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOneBy({
      name,
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOneBy({
      id,
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOneBy({
      email,
    });

    return customer;
  }
}

export default CustomersRepository;
