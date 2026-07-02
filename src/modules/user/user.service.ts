import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import type { Request } from "express";
import { Roles } from "src/common/enum/role.enum";
import * as bcrypt from "bcrypt";
import { UpdateProfileDto } from "./dto/user.dto";

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(REQUEST) private request: Request,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async userMe() {
    const user = this.request.user;

    return await this.userRepository.findOne({
      where: { id: user?.id },
    });
  }

  async changeUserRole(userId: number, newRole: Roles) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }
    user.role = newRole;

    await this.userRepository.save(user);

    return {
      message: "User role updated successfully",
      user: {
        id: user.id,
        role: user.role,
      },
    };
  }

  async updateProfile(updateProfileDto: UpdateProfileDto) {
    const currentUser = this.request.user;

    if (!currentUser) {
      throw new NotFoundException("User not found");
    }

    // پیدا کردن کاربر با اطلاعات کامل
    const user = await this.userRepository.findOne({
      where: { id: currentUser.id },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { firstName, lastName, email, password } =
      updateProfileDto;

    // بررسی یکتایی ایمیل
    if (email) {
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingUser && existingUser.id !== user.id) {
        throw new ConflictException("Email already exists");
      }

      user.email = email;
      user.isEmailVerified = false; // ایمیل جدید نیاز به تایید دارد
    }

    // آپدیت نام و نام خانوادگی
    if (firstName) {
      user.firstName = firstName;
    }

    if (lastName) {
      user.lastName = lastName;
    }

    // آپدیت رمز عبور (hash کردن)
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // ذخیره تغییرات
    await this.userRepository.save(user);

    // حذف اطلاعات حساس از پاسخ
    const { password: _, ...userWithoutPassword } = user;

    return {
      message: "Profile updated successfully",
      user: userWithoutPassword,
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
