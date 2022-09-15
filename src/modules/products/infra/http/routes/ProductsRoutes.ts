import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import {
  showValidator,
  createValidator,
  updateValidator,
  deleteValidator,
} from './ProductValidator';
const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.list);
productsRouter.get('/:id', showValidator, productsController.show);
productsRouter.post('/', createValidator, productsController.create);
productsRouter.put('/:id', updateValidator, productsController.update);
productsRouter.delete('/:id', deleteValidator, productsController.delete);

export default productsRouter;
