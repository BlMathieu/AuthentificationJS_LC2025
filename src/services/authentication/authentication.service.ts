import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import User from 'src/model/UserModel';
import CryptoUT from 'src/utilities/CryptoUT';

@Injectable()
export class AuthenticationService {
  private crypto = new CryptoUT();
  constructor(private jwtService: JwtService) { }

  async register(credentials: { login: string; password: string }) {
    const hashedPassword = this.crypto.hashPassword(credentials.password);
    const user = await User.create({ login: credentials.login, password: hashedPassword });
    await user.save();
  }

  async login(credentials: { login: string; password: string }): Promise<{ access: string; refresh: string; }> {
    const dbUser = await User.findOne({ where: { login: credentials.login } });
    if (!dbUser) throw new Error(`L'utilisateur ${credentials.login} n'existe pas`);
    const dbPassword = dbUser.get('password') as string || '';
    const status = this.crypto.checkPasswordWithHash(credentials.password, dbPassword);
    if (!status) throw new Error('Mot de passe incorrect !');

    const payload = { username: credentials.login };
    const accessSecret: JwtSignOptions = { secret: process.env.SECRET_ACCESSTOKEN || '' };
    const refreshSecret: JwtSignOptions = { secret: process.env.SECRET_REFRESHTOKEN || '' };
    const accessToken = await this.jwtService.signAsync(payload, accessSecret);
    const refreshToken = await this.jwtService.signAsync(payload, refreshSecret);
    await dbUser.update('refreshToken', refreshToken);

    return { access: accessToken, refresh: refreshToken };
  }
}
