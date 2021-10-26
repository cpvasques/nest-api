import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class UserDTO {
  @Expose()
  @IsNotEmpty({
    message: 'O nome é obrigatório.',
  })
  @IsString({
    message: 'O nome precisa ser uma string.',
  })
  name: string;

  @Expose()
  @IsNotEmpty({
    message: 'O sobrenome é obrigatório.',
  })
  @IsString({
    message: 'O sobrenome precisa ser uma string.',
  })
  lastName: string;

  @Expose()
  @IsNotEmpty({
    message: 'O nome de usuário é obrigatório.',
  })
  @IsString({
    message: 'O nome de usuário precisa ser uma string.',
  })
  username: string;

  @Expose()
  @IsNotEmpty({
    message: 'O nome de usuário é obrigatório.',
  })
  @IsEmail(
    {},
    {
      message: 'O email precisa ser um endereço de email válido.',
    },
  )
  email: string;

  @Expose()
  @Exclude({
    toPlainOnly: true,
  })
  @IsNotEmpty({
    message: 'A senha é obrigatório.',
  })
  @IsString({
    message: 'A senha precisa ser uma string.',
  })
  password: string;
}
