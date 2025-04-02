import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import User from 'src/model/UserModel';
import CryptoUT from 'src/utilities/CryptoUT';
import CredentialsInterface from 'src/utilities/types/CredentialsInterface';
import TokenResponseInterface, { TokenContent } from 'src/utilities/types/TokensInterface';

@Injectable()
export class AuthenticationService {

  private crypto = new CryptoUT();
  private accessSecret: JwtSignOptions;
  private refreshSecret: JwtSignOptions;

  constructor(private jwtService: JwtService) {
    this.accessSecret = { secret: process.env.SECRET_ACCESSTOKEN || '' };
    this.refreshSecret = { secret: process.env.SECRET_REFRESHTOKEN || '' };
  }

  async register(credentials: CredentialsInterface) {
    const hashedPassword = this.crypto.hashPassword(credentials.password);
    const user = await User.create({ login: credentials.login, password: hashedPassword });
    await user.save();
  }

  async login(credentials: CredentialsInterface): Promise<TokenResponseInterface> {
    const dbUser = await User.findOne({ where: { login: credentials.login } });
    if (!dbUser) throw new Error(`L'utilisateur ${credentials.login} n'existe pas`);

    const dbPassword = dbUser.get('password') as string || '';
    const dbIsAdmin = dbUser.get('isAdmin') as boolean;
    const status = this.crypto.checkPasswordWithHash(credentials.password, dbPassword);
    if (!status) throw new Error('Mot de passe incorrect !');

    const accessPayload: TokenContent = {
      username: credentials.login,
      iat: Date.now() + 1000 * 60,
      isAdmin: dbIsAdmin,
    }
    const accessToken = await this.jwtService.signAsync(accessPayload, this.accessSecret);
    const refreshPayload: TokenContent = {
      username: credentials.login,
      iat: Date.now() + 1000 * 60 * 60 * 24,
      isAdmin: dbIsAdmin,
    }
    const refreshToken = await this.jwtService.signAsync(refreshPayload, this.refreshSecret);
    await dbUser.update({ refreshToken: refreshToken });
    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  async refresh(refreshToken: string): Promise<string> {
    const content: TokenContent = await this.jwtService.verifyAsync(refreshToken, this.refreshSecret);
    if (!content) throw new Error('Invalid access token !');
    const payload: TokenContent = {
      username: content.username,
      iat: Date.now() + 1000 * 60,
      isAdmin: content.isAdmin,
    }
    const accessToken = await this.jwtService.signAsync(payload, this.accessSecret);
    return accessToken;
  }
}
