import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { GameService } from './game.service';

@Injectable()
@ValidatorConstraint()
export class IsGameNameUniqueConstraint
  implements ValidatorConstraintInterface
{
  constructor(private gameService: GameService) {}

  validate(
    gameName: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return !!!this.gameService.getGameByName(gameName);
  }
}

export function IsGameNameUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsGameNameUniqueConstraint,
    });
  };
}
