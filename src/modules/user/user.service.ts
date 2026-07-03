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
import { UserMessage } from "src/common/enum/message.enum";

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

    if (!user?.id) {
      throw new NotFoundException(UserMessage.USER_NOT_AUTHENTICATED);
    }

    const userData = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!userData) {
      throw new NotFoundException(UserMessage.USER_NOT_FOUND);
    }

    const { password, ...userWithoutPassword } = userData;
    return {
      message: UserMessage.PROFILE_FETCHED,
      data: userWithoutPassword,
    };
  }

  async changeUserRole(userId: number, newRole: Roles) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(UserMessage.USER_NOT_FOUND);
    }

    user.role = newRole;
    await this.userRepository.save(user);

    return {
      message: UserMessage.USER_ROLE_UPDATED,
      data: {
        id: user.id,
        role: user.role,
      },
    };
  }

  async updateProfile(updateProfileDto: UpdateProfileDto) {
    const currentUser = this.request.user;

    if (!currentUser) {
      throw new NotFoundException(UserMessage.USER_NOT_AUTHENTICATED);
    }

    const user = await this.userRepository.findOne({
      where: { id: currentUser.id },
    });

    if (!user) {
      throw new NotFoundException(UserMessage.USER_NOT_FOUND);
    }

    const { firstName, lastName, email, password } = updateProfileDto;

    if (email) {
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingUser && existingUser.id !== user.id) {
        throw new ConflictException(UserMessage.EMAIL_ALREADY_EXISTS);
      }

      user.email = email;
      user.isEmailVerified = false;
    }

    if (firstName) {
      user.firstName = firstName;
    }

    if (lastName) {
      user.lastName = lastName;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await this.userRepository.save(user);

    const { password: _, ...userWithoutPassword } = user;

    return {
      message: UserMessage.PROFILE_UPDATED,
      data: userWithoutPassword,
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(UserMessage.USER_NOT_FOUND);
    }

    const { password, ...userWithoutPassword } = user;
    return {
      message: UserMessage.USER_FOUND,
      data: userWithoutPassword,
    };
  }
}
