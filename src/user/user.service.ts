import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDTO } from './user.dto';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getAllUsers(): Promise<UserDTO[]> {
    const users = await this.userModel.findAll({ raw: true });

    if (!users) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuários não encontrados.',
      });
    }

    return users;
  }

  async getByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ where: { username } });
  }

  async getUserById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async createUser(user: UserDTO) {
    const userExists = await this.getByUsername(user.username);
    const password = await bcrypt.hash(user.password, 10);

    if (userExists) {
      throw new NotFoundException({
        statusCode: HttpStatus.OK,
        message: 'Usuário já existe.',
      });
    }

    user.password = password;

    this.userModel.create(user);

    return user;
  }

  async updateUser(id: number, user: UserDTO): Promise<[number, UserDTO[]]> {
    return this.userModel.update(user, { where: { id } });
  }

  async deleteUser(id: number) {
    const user: User = await this.getUserById(id);
    user.destroy();

    return id;
  }
}
