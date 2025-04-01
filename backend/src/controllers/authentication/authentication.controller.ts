import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from 'src/services/authentication/authentication.service';
import { AuthResponse, getError, getSuccess } from 'src/utilities/AuthenticationResponse';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) { }

  @Post('register')
  async register(@Body() credentials: { login: string; password: string }): Promise<AuthResponse> {
    try {
      await this.authenticationService.register(credentials);
      return getSuccess(`Utilisateur ${credentials.login} créé !`);
    }
    catch (error) {
      return getError(error.message);
    }
  }

  @Post('login')
  async login(@Body() credentials: { login: string; password: string }, @Res() response: Response) {
    try {
      const tokens = await this.authenticationService.login(credentials);
      response.cookie('refresh_token', tokens.refresh);
      response.send(getSuccess(`L'utilisateur ${credentials.login} est bien connecté !`,tokens.access));
    }
    catch (error) {
      console.error(error);
      response.send(getError(error.message));
    }
  }
}