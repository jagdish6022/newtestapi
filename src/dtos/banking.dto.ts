import { IsEmail, IsString } from 'class-validator';

export class CreateBankingDto {
  @IsString()
  public accountNo: string;

}

