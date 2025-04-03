import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import User from "src/model/UserModel";
import { authError } from "src/utilities/responses/AuthenticationResponse";

@Injectable()
export class IsAdminMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '') || '';
            if (!token) res.send(authError('Aucun utilisateur !'));
            const user = this.jwtService.decode(token);
            const dbUser = await User.findOne({ where: { login: user.username } });
            if (!dbUser) throw new Error(`L'utilisateur n'existe pas !`);
            if (dbUser.get('role') === 'admin') next();
            else res.send(authError(`L'utilisateur n'est pas un administrateur !`));
        } catch (error) {
            if (error instanceof Error) res.send(authError(error.message));
            else res.send(authError(`Erreur du serveur, token invalide !`));
        }
    }
}

@Injectable()
export class IsGuestMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '') || '';
            if (!token) res.send(authError('Aucun utilisateur !'));
            const user = this.jwtService.decode(token);
            const dbUser = await User.findOne({ where: { login: user.username } });
            if (!dbUser) throw new Error(`L'utilisateur n'existe pas !`);
            if (dbUser.get('role') === 'guest') next();
            else res.send(authError(`L'utilisateur n'est pas un guest !`));
        } catch (error) {
            if (error instanceof Error) res.send(authError(error.message));
            else res.send(authError(`Erreur du serveur, token invalide !`));
        }
    }
}