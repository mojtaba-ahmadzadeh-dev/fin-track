import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { OtpEntity } from "../user/entities/otp.entity";
import { SendOtpDto, VerifyOtpDto } from "./dto/auth.dto";
import { Roles } from "src/common/enum/role.enum";
import { AuthMessage } from "src/common/enum/message.enum";
import { CookiesOptionsToken } from "src/common/utils/cookie.util";
import { AuthResponse } from "./types/response";
import type { Response } from "express";
import { CookieKeys } from "src/common/enum/cookie.enum";
import { TokenService } from "./token.service";
import { randomInt } from "crypto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(OtpEntity)
    private otpRepository: Repository<OtpEntity>,
    private tokenService: TokenService,
  ) {}

  async sendOtp(otpDto: SendOtpDto) {
    const { phone } = otpDto;
    let user = await this.userRepository.findOneBy({ phone });
    if (!user) {
      user = this.userRepository.create({
        phone,
      });
      user = await this.userRepository.save(user);
    }
    await this.createOtpForUser(user);
    return {
      message: "sent code successfully",
    };
  }
  async checkOtp(otpDto: VerifyOtpDto, res: Response) {
    const { phone, code } = otpDto;
    const now = new Date();

    const user = await this.userRepository.findOne({
      where: { phone },
      relations: {
        otp: true,
      },
    });

    if (!user || !user?.otp) {
      throw new UnauthorizedException(AuthMessage.USER_NOT_FOUND);
    }

    const otp = user?.otp;

    if (otp?.code !== code) {
      throw new UnauthorizedException(AuthMessage.INVALID_OTP);
    }

    if (otp.expiresIn < now) {
      throw new UnauthorizedException(AuthMessage.OTP_EXPIRED);
    }

    if (!user.isPhoneVerified) {
      await this.userRepository.update(
        { id: user.id },
        { isPhoneVerified: true },
      );
    }

    await this.otpRepository.update(
      { userId: user.id },
      { expiresIn: new Date() },
    );

    const { accessToken, refreshToken } = this.makeTokensForUser({
      userId: user.id,
      phone: user.phone,
      role: user.role,
    });

    res.cookie(CookieKeys.ACCESS_TOKEN, accessToken, CookiesOptionsToken());
    res.cookie(CookieKeys.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken,
      refreshToken,
      message: AuthMessage.OTP_VERIFIED_SUCCESS,
    };
  }
  private makeTokensForUser(payload: {
    userId: number;
    phone?: string;
    role?: string;
  }) {
    const accessToken = this.tokenService.createAccessToken(payload);
    const refreshToken = this.tokenService.createRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }
  async sendResponse(res: Response, result: AuthResponse) {
    const { token, code } = result;
    res.cookie(CookieKeys.OTP, token, CookiesOptionsToken());
    return res.json({
      message: "",
      code,
    });
  }
  async createOtpForUser(user: UserEntity) {
    const expiresIn = new Date(new Date().getTime() + 1000 * 60 * 2);
    const code = randomInt(100000, 999999).toString();
    let otp = await this.otpRepository.findOneBy({ userId: user.id });
    if (otp) {
      if (otp.expiresIn > new Date()) {
        throw new BadRequestException("otp code not expired");
      }
      otp.code = code;
      otp.expiresIn = expiresIn;
    } else {
      otp = this.otpRepository.create({
        code,
        expiresIn,
        userId: user.id,
      });
    }
    otp = await this.otpRepository.save(otp);
    user.otpId = otp.id;
    await this.userRepository.save(user);
  }
  async validateAccessToken(token: string) {
    const { userId } = this.tokenService.verifyAccessToken(token);
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new UnauthorizedException(AuthMessage.LoginAgain);
    return user;
  }
}
