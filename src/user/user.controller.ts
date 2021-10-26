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
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<UserDTO[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:username')
  async getByUsername(@Param('username') username): Promise<UserDTO> {
    return this.userService.getByUsername(username);
  }

  @Post()
  async createUser(@Body() user: UserDTO): Promise<NestResponse> {
    const userCreated = await this.userService.createUser(user);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeader({
        Location: `/users/${userCreated.name}`,
      })
      .withBody(userCreated)
      .build();
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id,
    @Body() user: UserDTO,
  ): Promise<NestResponse> {
    const editedUser = await this.userService.updateUser(id, user);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeader({
        Location: `/users/${editedUser}`,
      })
      .withBody(editedUser)
      .build();
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id) {
    const userDeleted = await this.userService.deleteUser(id);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeader({
        Location: `/users/${userDeleted}`,
      })
      .build();
  }
}
