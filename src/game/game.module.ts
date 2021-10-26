import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GamesController } from './game.controller';
import { Game } from './game.model';
import { GameService } from './game.service';

@Module({
  imports: [SequelizeModule.forFeature([Game])],
  controllers: [GamesController],
  providers: [GameService],
})
export class GameModule {}
