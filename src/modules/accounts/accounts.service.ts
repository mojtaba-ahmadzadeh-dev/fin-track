import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }
}
