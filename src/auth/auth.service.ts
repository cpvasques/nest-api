import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDTO): Promise<any> {
    const user = await this.userService.getByUsername(loginDto.username);

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuário não encontrado.',
      });
    }

    const isPasswordCorret = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordCorret) {
      throw new NotFoundException({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'A senha está incorreta.',
      });
    }

    const jwtPayload: any = {
      user,
    };

    const token = this.jwtService.sign(jwtPayload, { expiresIn: '24h' });

    return {
      user,
      token,
    };
  }

  async logout(token: string): Promise<void> {
    if (!token) {
      return;
    }
  }
}
