import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'Usuário não informado' })
  @IsString({ message: 'Usuário não informado' })
  username: string;

  @IsNotEmpty({ message: 'Senha não informada' })
  @IsString({ message: 'Senha não informada' })
  password: string;
}
