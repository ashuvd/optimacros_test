import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (req, login, password): Promise<boolean> => {
    const user = await this.authenticationService.getAuthenticatedUser(
      login,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return true;
  };
}
