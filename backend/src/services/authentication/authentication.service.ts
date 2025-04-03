import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from 'src/model/UserModel';
import CryptoUT from 'src/utilities/CryptoUT';
import JWTPayloadUT from 'src/utilities/JWTPayloadUT';
import CredentialsInterface from 'src/utilities/types/CredentialsInterface';
import TokenResponseInterface, { TokenContent } from 'src/utilities/types/TokensInterface';

@Injectable()
export class AuthenticationService {

  private crypto = new CryptoUT();
  private jwtUT: JWTPayloadUT;
  constructor(private jwtService: JwtService) {
    this.jwtUT = new JWTPayloadUT(jwtService);
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
    const dbRole = dbUser.get('role') as string;
    const status = this.crypto.checkPasswordWithHash(credentials.password, dbPassword);
    if (!status) throw new Error('Mot de passe incorrect !');

    const access = await this.jwtUT.getAcessToken({ username: credentials.login, role: dbRole });
    const refresh = await this.jwtUT.getRefreshToken({ username: credentials.login, role: dbRole });

    await dbUser.update({ refreshToken: access });
    return { accessToken: access, refreshToken: refresh };
  }

  async refresh(refreshToken: string): Promise<string> {
    const content: TokenContent = await this.jwtService.verifyAsync(refreshToken, this.jwtUT.getRefreshSecret());
    if (!content) throw new Error('Invalid access token !');

    const accessToken = await this.jwtUT.getAcessToken({ username: content.username, role: content.role });
    return accessToken;
  }
}
