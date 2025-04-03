import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationService } from 'src/services/authentication/authentication.service';
import { authError, authSuccess } from 'src/utilities/responses/AuthenticationResponse';
import AuthInterface from 'src/utilities/types/AuthInterface';
import CredentialsInterface from 'src/utilities/types/CredentialsInterface';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) { }

  @Post('register')
  async register(@Body() credentials: CredentialsInterface): Promise<AuthInterface> {
    try {
      await this.authenticationService.register(credentials);
      return authSuccess(`Utilisateur ${credentials.login} créé !`);
    }
    catch (error) {
      console.error(error);
      if (error instanceof Error) return authError(error.message);
      else return authError(`Échec de l'inscription !`);
    }
  }

  @Post('login')
  async login(@Body() credentials: CredentialsInterface, @Res() response: Response): Promise<void> {
    try {
      const tokens = await this.authenticationService.login(credentials);
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);
      response.cookie('refresh_token', tokens.refreshToken, { httpOnly: true, expires: expirationDate });
      response.send(authSuccess(`L'utilisateur ${credentials.login} est bien connecté !`, tokens.accessToken));
    }
    catch (error) {
      console.error(error);
      if (error instanceof Error) response.send(authError(error.message));
      else response.send(authError(`Échec de l'authentification !`));
    }
  }

  @Post('refresh')
  async refresh(@Req() request: Request): Promise<AuthInterface> {
    try {
      const token = request.headers.cookie?.replace('refresh_token=', '');
      if (!token) throw new Error('Token unavailable !');
      const newToken = await this.authenticationService.refresh(token);
      return authSuccess(`Reconnexion réussi !`, newToken);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) return authError(error.message);
      else return authError(`Échec de l'authentification !`);
    }
  }

  @Post('logout')
  logout(@Res() response: Response): void {
    try {
      response.clearCookie('refresh_token');
      response.send(authSuccess('Déconnexion réussi !'));
    } catch (error) {
      if (error instanceof Error) response.send(authError(error.message));
      else response.send('Échec de la déconnexion, erreur du serveur !');
    }
  }
}