import { Injectable } from '@nestjs/common';
import User from 'src/model/UserModel';

@Injectable()
export class UserService {

    public async getUsers() {
        return await User.findAll();
    }
    public async getUserByLogin(login: string) {
        return await User.findOne({ where: { login: login } });
    }

    public async deleteUserByLogin(login: string) {
        return await User.destroy({ where: { login: login } });
    }
}
