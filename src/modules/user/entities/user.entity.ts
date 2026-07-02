import { EntityName } from "../../../common/enum/entity.enum";
import { Roles } from "../../../common/enum/role.enum";
import { BaseEntity } from "../../../common/abstracts/base.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  UpdateDateColumn,
} from "typeorm";
import { OtpEntity } from "./otp.entity";

@Entity(EntityName.User)
export class UserEntity extends BaseEntity {
  @Column({ type: "varchar", length: 255, unique: true, nullable: true })
  email: string;
  @Column({ type: "varchar", length: 255, nullable: true })
  password: string;
  @Column({ type: "varchar", length: 100, nullable: true })
  firstName: string;
  @Column({ type: "varchar", length: 100, nullable: true })
  lastName: string;
  @Column({ type: "varchar", length: 20, unique: true })
  phone: string;
  @Column({ default: true })
  isActive: boolean;
  @Column({ default: false })
  isEmailVerified: boolean;
  @Column({ default: false })
  isPhoneVerified: boolean;
  @Column({ nullable: true })
  otpId: number;
  @Column({
    type: "enum",
    enum: [Roles.User, Roles.Admin, Roles.SuperAdmin],
    default: Roles.User,
  })
  role: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToOne(() => OtpEntity, (otp) => otp.user)
  @JoinColumn({ name: "otpId" })
  otp: OtpEntity;
}
