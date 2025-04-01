import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from 'src/services/authentication/authentication.service';
import { AuthResponse, getError, getSuccess } from 'src/types/AuthenticationResponse';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) { }

  @Post('register')
  async register(@Body() credentials: { login: string; password: string }): Promise<AuthResponse> {
    try {
      await this.authenticationService.login(credentials);
      return getSuccess(`Utilisateur ${credentials.login} créé !`);
    }
    catch (error) {
      return getError(error.message);
    }
  }

  @Post('login')
  async login(@Body() credentials: { login: string; password: string }): Promise<AuthResponse> {
    try {
      const status = await this.authenticationService.login(credentials);
      if (!status) throw new Error('Mot de passe incorrect !');
      return getSuccess(`L'utilisateur ${credentials.login} est bien connecté !`);
    }
    catch (error) {
      return getError(error.message);
    }
  }
}