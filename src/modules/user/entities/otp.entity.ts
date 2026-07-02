import { Column, Entity, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { EntityName } from "../../../common/enum/entity.enum";
import { BaseEntity } from "../../../common/abstracts/base.entity";

@Entity(EntityName.Otp)
export class OtpEntity extends BaseEntity {
  @Column()
  code: string;
  @Column()
  expiresIn: Date;
  @Column()
  userId: number;
  @Column({ nullable: true })
  method: string;
@OneToOne(() => UserEntity, (user) => user.otp, { onDelete: "CASCADE" })
user: UserEntity;
}