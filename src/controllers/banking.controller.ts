import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import BankingService from '@services/banking.service';
import { CreateBankingDto } from '@/dtos/banking.dto';

class BankingController {
  constructor(
    public bankingService: BankingService
    ) { }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: CreateBankingDto = req.body;
      const createdBankDetailsData: User[] = await this.bankingService.createUser(data);
      res.status(200).json({ data: createdBankDetailsData, message: 'create Bank User' });
    } catch (error) {
      next(error);
    }
  };

}

export default BankingController;
