import { BaseEntity } from "../../../common/abstracts/base.entity";
import { EntityName } from "../../../common/enum/entity.enum";
import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { AccountType } from "../../../common/enum/account-type.enum";

@Entity(EntityName.Accounts)
export class AccountEntity extends BaseEntity {
  @Column({ type: "varchar", length: 100 })
  name: string;
  @Column({
    type: "enum",
    enum: AccountType,
    default: AccountType.WALLET,
  })
  type: AccountType;
  @Column({ type: "varchar", length: 10, default: "IRR" })
  currency: string;
  @Column({
    type: "decimal",
    precision: 18,
    scale: 4,
    default: 0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  balance: number;
  @Column({
    type: "decimal",
    precision: 18,
    scale: 4,
    default: 0,
  })
  initialBalance: number;
  @Column({ type: "varchar", length: 50, nullable: true })
  icon: string;
  @Column({ type: "varchar", length: 50, nullable: true })
  color: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ default: false })
  isDefault: boolean;
  @Column({ default: true })
  isActive: boolean;
  // ==================== Relations ====================
  @ManyToOne(() => UserEntity, (user) => user.accounts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column()
  userId: number;
}
