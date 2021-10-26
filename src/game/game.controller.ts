import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { GameDTO } from './game.dto';
import { Game } from './game.model';
import { GameService } from './game.service';

@Controller('games')
export class GamesController {
  constructor(private gameService: GameService) {}

  @Get()
  async getAll(): Promise<GameDTO[]> {
    const games = await this.gameService.getAllGames();

    if (!games) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Jogos não encontrados.',
      });
    }

    return games;
  }

  @Get('/:name')
  async getGameByName(@Param() param): Promise<GameDTO[]> {
    const games = await this.gameService.getGameByName(param.name);

    if (!games.length) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Jogo não encontrado.',
      });
    }

    return games;
  }

  @Post()
  async createGame(@Body() game: GameDTO): Promise<NestResponse> {
    const gameCreated = await this.gameService.createGame(game);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeader({
        Location: `/games/${gameCreated.name}`,
      })
      .withBody(gameCreated)
      .build();
  }

  @Put('/:id')
  async updateGame(
    @Param('id') id,
    @Body() game: GameDTO,
  ): Promise<NestResponse> {
    const editedGame = await this.gameService.updateGame(id, game);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeader({
        Location: `/games/${editedGame}`,
      })
      .withBody(editedGame)
      .build();
  }

  @Delete('/:id')
  async deleteGame(@Param('id') id) {
    const gameDeleted = await this.gameService.deleteGame(id);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeader({
        Location: `/games/${gameDeleted}`,
      })
      .build();
  }
}
