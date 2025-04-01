import * as bcrypt from 'bcrypt';
export default class CryptoUT {
  constructor() {}

  public hashPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
  public checkPasswordWithHash(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
