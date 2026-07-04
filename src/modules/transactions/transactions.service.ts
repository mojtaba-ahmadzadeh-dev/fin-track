import { BadRequestException, Inject, Injectable, Scope } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionEntity } from "./entities/transaction.entity";
import { Repository } from "typeorm";
import { AccountEntity } from "../accounts/entities/account.entity";
import { REQUEST } from "@nestjs/core";
import { TransactionType } from "src/common/enum/transaction-type.enum";
import type { Request } from "express";

@Injectable({ scope: Scope.REQUEST })
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,

    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,

    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const user = this.request.user;

    if (!user) {
      throw new BadRequestException("کاربر احراز هویت نشده است");
    }

    const {
      amount,
      type,
      accountId,
      categoryId,
      description,
      date,
      reference,
      isRecurring,
    } = createTransactionDto;

    const account = await this.accountRepository.findOne({
      where: { id: accountId, userId: user.id, isActive: true },
    });

    if (!account) {
      throw new BadRequestException("حساب مورد نظر یافت نشد یا دسترسی ندارید");
    }

    // ایجاد تراکنش
    const transaction = this.transactionRepository.create({
      amount,
      type,
      accountId,
      categoryId,
      description,
      date: date || new Date().toISOString().split("T")[0],
      reference,
      isRecurring: isRecurring || false,
      userId: user.id,
    });

    const savedTransaction = await this.transactionRepository.save(transaction);

    // به‌روزرسانی موجودی حساب
    const newBalance =
      type === TransactionType.INCOME
        ? account.balance + amount
        : account.balance - amount;

    await this.accountRepository.update(accountId, { balance: newBalance });

    return {
      success: true,
      message: "تراکنش با موفقیت ثبت شد",
      data: savedTransaction,
    };
  }
}
