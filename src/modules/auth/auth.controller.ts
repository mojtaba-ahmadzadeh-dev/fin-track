import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SendOtpDto, VerifyOtpDto } from "./dto/auth.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import type { Request, Response } from "express";
import { AuthGuard } from "./guards/auth.guard";
import { AuthDecorator } from "src/common/decorator/auth.decorator";
import { CanAccess } from "src/common/decorator/role.decorator";
import { Roles } from "src/common/enum/role.enum";

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

  @Get("check-login")
  @CanAccess(Roles.Admin, Roles.User, Roles.SuperAdmin)
  @AuthDecorator()
  async checkLogin(@Req() req: Request) {
    return req.user;
  }
}
