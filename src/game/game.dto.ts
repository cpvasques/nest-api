import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GameDTO {
  @Expose()
  @IsNotEmpty({
    message: 'O nome do jogo é obrigatório.',
  })
  @IsString({
    message: 'O nome do jogo precisa ser uma string.',
  })
  name: string;

  @Expose()
  @IsNotEmpty({
    message: 'A categoria do jogo é obrigatório.',
  })
  @IsString({
    message: 'A categoria do jogo precisa ser uma string.',
  })
  category: string;

  @Expose()
  @IsNotEmpty({
    message: 'O preço do jogo é obrigatório.',
  })
  @IsNumber()
  price: number;

  @IsNotEmpty({
    message: 'A disponibilidade do jogo é obrigatória.',
  })
  isAvailable: boolean;
}
