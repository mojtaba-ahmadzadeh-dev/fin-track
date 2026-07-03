import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from "@nestjs/common";
import { CreateAccountDto } from "./dto/create-account.dto";
import { AccountType } from "src/common/enum/account-type.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "./entities/account.entity";
import { Not, Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import type { Request } from "express";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { AccountMessage } from "src/common/enum/message.enum";

@Injectable({ scope: Scope.REQUEST })
export class AccountsService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @Inject(REQUEST) private request: Request,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const user = this.request.user;

    if (!user) {
      throw new BadRequestException(AccountMessage.USER_NOT_AUTHENTICATED);
    }

    const {
      name,
      color,
      currency = "IRR",
      description,
      icon,
      initialBalance = 0,
      isDefault = false,
      type = AccountType.WALLET,
    } = createAccountDto;

    if (isDefault) {
      await this.accountRepository.update(
        { userId: user.id, isDefault: true },
        { isDefault: false },
      );
    }

    const account = this.accountRepository.create({
      name,
      type,
      currency,
      initialBalance,
      balance: initialBalance,
      icon,
      color,
      description,
      isDefault,
      userId: user.id,
    });

    const savedAccount = await this.accountRepository.save(account);

    return {
      success: true,
      message: AccountMessage.CREATED,
      data: savedAccount,
    };
  }

  async findAll() {
    const user = this.request.user;

    if (!user) {
      throw new BadRequestException(AccountMessage.USER_NOT_AUTHENTICATED);
    }

    const accounts = await this.accountRepository.find({
      where: {
        userId: user.id,
        isActive: true,
      },
      order: {
        id: "DESC",
      },
    });

    return {
      success: true,
      message: AccountMessage.FOUND_ALL,
      data: accounts,
      meta: {
        total: accounts.length,
      },
    };
  }

  async findOne(id: number) {
    const user = this.request.user;

    if (!user) {
      throw new BadRequestException(AccountMessage.USER_NOT_AUTHENTICATED);
    }

    const account = await this.accountRepository.findOne({
      where: {
        id,
        userId: user.id,
        isActive: true,
      },
      relations: ["user"],
    });

    if (!account) {
      throw new NotFoundException(AccountMessage.NOT_FOUND);
    }

    return {
      success: true,
      message: AccountMessage.FOUND_ONE,
      data: account,
    };
  }

  async remove(id: number) {
    const user = this.request.user;
    if (!user) {
      throw new BadRequestException(AccountMessage.USER_NOT_AUTHENTICATED);
    }

    const account = await this.accountRepository.findOne({
      where: {
        id,
        userId: user.id,
        isActive: true,
      },
    });

    if (!account) {
      throw new NotFoundException(AccountMessage.NOT_FOUND);
    }

    await this.accountRepository.delete({
      id,
      userId: user.id,
    });

    return {
      success: true,
      message: AccountMessage.DELETED,
    };
  }

  async getBalance(id: number) {
    const user = this.request.user;

    if (!user) {
      throw new BadRequestException(AccountMessage.USER_NOT_AUTHENTICATED);
    }

    const account = await this.accountRepository.findOne({
      where: {
        id,
        userId: user.id,
        isActive: true,
      },
      select: ["id", "name", "balance", "currency", "isActive"],
    });

    if (!account) {
      throw new NotFoundException(AccountMessage.NOT_FOUND);
    }

    return {
      success: true,
     message: AccountMessage.BALANCE_FETCHED,
      data: {
        accountId: account.id,
        accountName: account.name,
        balance: account.balance,
        currency: account.currency,
        updatedAt: new Date(),
      },
    };
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const user = this.request.user;

   if (!user) {
      throw new BadRequestException(AccountMessage.USER_NOT_AUTHENTICATED);
    }

    const account = await this.accountRepository.findOne({
      where: { id, userId: user.id, isActive: true },
    });

    if (!account) {
      throw new NotFoundException(AccountMessage.NOT_FOUND);
    }


    if (updateAccountDto.isDefault === true) {
      await this.accountRepository.update(
        { userId: user.id, isDefault: true },
        { isDefault: false },
      );
    }

    if (updateAccountDto.initialBalance !== undefined) {
      updateAccountDto["balance"] = updateAccountDto.initialBalance;
    }

    Object.assign(account, updateAccountDto);

    const updatedAccount = await this.accountRepository.save(account);

    return {
      success: true,
      message: AccountMessage.UPDATED,
      data: updatedAccount,
    };
  }
}
