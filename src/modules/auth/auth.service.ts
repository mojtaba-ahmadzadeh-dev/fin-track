import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { OtpEntity } from "../user/entities/otp.entity";
import { SendOtpDto } from "./dto/auth.dto";
import { Roles } from "src/common/enum/role.enum";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(OtpEntity)
    private otpRepository: Repository<OtpEntity>,
  ) {}

  async sendOtp(dto: SendOtpDto) {
    const { phone } = dto;

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresIn = new Date(Date.now() + 3 * 60 * 1000);

    let user = await this.userRepository.findOne({ where: { phone } });

    if (!user) {
      const userCount = await this.userRepository.count();

      const isFirstUser = userCount === 0;

      user = this.userRepository.create({
        phone,
        isActive: true,
        role: isFirstUser ? Roles.SuperAdmin : Roles.User, 
      });

      user = await this.userRepository.save(user);
    }

    await this.otpRepository.delete({ userId: user.id });

    const otp = this.otpRepository.create({
      code,
      expiresIn,
      userId: user.id,
      method: "sms",
    });

    await this.otpRepository.save(otp);

    user.otpId = otp.id;
    await this.userRepository.save(user);

    console.log(`📨 OTP for ${phone} : ${code}`);

    return {
      message: "کد تأیید با موفقیت ارسال شد",
    };
  }
}
