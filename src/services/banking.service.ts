
import bcrypt from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateBankingDto } from '@/dtos/banking.dto';

class BankingService {
  public async createUser(reqData: CreateBankingDto): Promise<any> {
    if (isEmpty(reqData)) throw new HttpException(400, "You're not req data");

    return reqData;
  }
}

export default BankingService;
