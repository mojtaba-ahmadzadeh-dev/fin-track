import { BaseEntity } from "../../../common/abstracts/base.entity";
import { EntityName } from "../../../common/enum/entity.enum";
import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { CategoryEntity } from "../../category/entities/category.entity";
import { TransactionType } from "../../../common/enum/transaction-type.enum";
import { AccountEntity } from "../../accounts/entities/account.entity";

@Entity(EntityName.TransActions)
export class TransactionEntity extends BaseEntity {
  @Column({
    type: "decimal",
    precision: 18,
    scale: 4,
  })
  amount: number;
  @Column({
    type: "enum",
    enum: TransactionType,
  })
  type: TransactionType;
  @Column({ type: "varchar", length: 500, nullable: true })
  description: string;
  @Column({ type: "date" })
  date: string;
  @Column({ type: "boolean", default: false })
  isRecurring: boolean;
  @Column({ type: "varchar", length: 100, nullable: true })
  reference: string;
  @Column({ default: true })
  isActive: boolean;
  @ManyToOne(() => UserEntity, (user) => user.transactions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: UserEntity;
  @Column()
  userId: number;
  @ManyToOne(() => AccountEntity, (account) => account.transactions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "accountId" })
  account: AccountEntity;
  @Column()
  accountId: number;
  @ManyToOne(() => CategoryEntity, (category) => category.transactions, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "categoryId" })
  category: CategoryEntity;
  @Column({ nullable: true })
  categoryId: number;
}
