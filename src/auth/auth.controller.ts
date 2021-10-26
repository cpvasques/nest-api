import { Body, Headers, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  loginUser(@Body() loginDto: LoginDTO): Promise<any> {
    return this.authService.login(loginDto);
  }

  @Post('/logout')
  logoutUser(@Headers('Authorization') token: string): Promise<void> {
    return this.authService.logout(token);
  }
}
