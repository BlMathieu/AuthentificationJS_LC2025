import { Controller, Delete, Get, Patch, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/services/user/user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }
    @Get('')
    async getAllUsers() {
        return await this.userService.getUsers();
    }
    @Get('/:login')
    async getUserByLogin(@Req() request: Request) {
        try {
            return await this.userService.getUserByLogin(request.params.login);
        } catch (error) {
            return 'Paramètre invalide !';
        }
    }
    @Delete('/:login')
    async deleteUserByLogin(@Req() request: Request) {
        try {
            return await this.userService.deleteUserByLogin(request.params.login);
        } catch (error) {
            return 'Paramètre invalide !';
        }
    }
}

