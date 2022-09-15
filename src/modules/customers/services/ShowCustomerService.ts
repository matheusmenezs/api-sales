import AppError from '@shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customer = await CustomersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
