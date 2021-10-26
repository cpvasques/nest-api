import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GameDTO } from './game.dto';
import { Game } from './game.model';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game) private gameModel: typeof Game) {}

  async getAllGames(): Promise<GameDTO[]> {
    return this.gameModel.findAll({ raw: true });
  }

  async getGameByName(name: string): Promise<Game[]> {
    return this.gameModel.findAll({
      raw: true,
      where: {
        name: name,
      },
    });
  }

  async getGameById(id: number): Promise<Game> {
    return this.gameModel.findByPk(id);
  }

  async createGame(game: GameDTO) {
    this.gameModel.create(game);

    return game;
  }

  async updateGame(id: number, game: GameDTO): Promise<[number, GameDTO[]]> {
    return this.gameModel.update(game, { where: { id } });
  }

  async deleteGame(id: number) {
    const game: Game = await this.getGameById(id);
    game.destroy();

    return id;
  }
}
