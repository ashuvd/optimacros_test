import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RequestWithUser } from './interfaces/requestWithUser.interface';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor() {}

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;

    return {
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
