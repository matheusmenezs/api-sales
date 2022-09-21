import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';
class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = new CustomersRepository();
    const customers = customersRepository.findAll();

    return customers;
  }
}

export default ListCustomerService;
