import { Injectable } from '@nestjs/common';
import User from 'src/model/UserModel';
import CryptoUT from 'src/utilities/CryptoUT';

@Injectable()
export class AuthenticationService {
  private crypto = new CryptoUT();
  constructor() { }

  async register(credentials: { login: string; password: string }) {
    const hashedPassword = this.crypto.hashPassword(credentials.password);
    const user = await User.create({ login: credentials.login, password: hashedPassword });
    await user.save();
  }

  async login(credentials: { login: string; password: string }) {
    const dbUser = await User.findOne({ where: { login: credentials.login } });
    if (!dbUser) throw new Error(`L'utilisateur ${credentials.login} n'existe pas`);
    const dbPassword = dbUser.get('password') as string || '';
    return this.crypto.checkPasswordWithHash(credentials.password, dbPassword);
  }
}
