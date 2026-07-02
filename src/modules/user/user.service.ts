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
}
