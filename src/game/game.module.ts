import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IsGameNameUniqueConstraint } from './is-game-name-unique.validator';
import { GamesController } from './game.controller';
import { Game } from './game.model';
import { GameService } from './game.service';

@Module({
  imports: [SequelizeModule.forFeature([Game])],
  controllers: [GamesController],
  providers: [GameService, IsGameNameUniqueConstraint],
})
export class GameModule {}
