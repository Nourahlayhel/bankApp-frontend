import { LoggedInUserDto } from '../login/login/LoggedInUserDto';

export class AccountDto {
  accountId: number = 0;
  balance: number = 0;
  currencyId: number = 0;
  currency: string = '';
  creationDate: Date = new Date();
  transactions: TransactionDto[] = [];
  user: LoggedInUserDto | null = null;
}

export class TransactionDto {
  transactionId: number = 0;
  accountId: number = 0;
  transactionType: string = '';
  amount: number = 0;
  transactionDate: Date = new Date();
  transactionTypeId: number = 0;
}
