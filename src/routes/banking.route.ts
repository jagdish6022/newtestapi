import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import BankingController from '@/controllers/banking.controller';
import BankingService from '@/services/banking.service';
import { CreateBankingDto } from '@/dtos/banking.dto';

class UsersRoute implements Routes {
  public path = '/banking';
  public router = Router();
  public bankingController = new BankingController(new BankingService);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(CreateBankingDto, 'body'), this.bankingController.create);
  }
}

export default UsersRoute;
