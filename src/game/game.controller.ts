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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { GameDTO } from './game.dto';
import { Game } from './game.model';
import { GameService } from './game.service';

@Controller('games')
export class GamesController {
  constructor(private gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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
