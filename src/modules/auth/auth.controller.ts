import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SendOtpDto, VerifyOtpDto } from "./dto/auth.dto";
import { ApiTags } from "@nestjs/swagger";
import type { Response } from "express";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("send-otp")
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto);
  }

  @Post("check-otp")
  async checkOtp(
    @Body() verifyOtpDto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.checkOtp(verifyOtpDto, res);
  }
}
