import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  public async getAuthenticatedUser(login: string, plainPassword: string) {
    try {
      const user = await this.usersService.getByLogin(login);
      await this.verifyPassword(plainPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'WRONG_CREDENTIALS_PROVIDED',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'WRONG_CREDENTIALS_PROVIDED',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
