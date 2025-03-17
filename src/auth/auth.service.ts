import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const { password, ...result } = user.toObject();
    return result;
  }

  async login(user: any) {
    if (!user || !user.email || !user._id) {
      throw new HttpException('Invalid user object', HttpStatus.BAD_REQUEST);
    }
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
