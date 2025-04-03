import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { TokenContent, UserInformation } from "./types/TokensInterface"

export default class JWTPayloadUT {
    private accessSecret: JwtSignOptions;
    private refreshSecret: JwtSignOptions;
    private jwtService: JwtService
    constructor(jwtService: JwtService) {
        this.jwtService = jwtService;
        this.accessSecret = { secret: process.env.SECRET_ACCESSTOKEN || '' };
        this.refreshSecret = { secret: process.env.SECRET_REFRESHTOKEN || '' };
    }

    public async getAcessToken(userInformation: UserInformation): Promise<string> {
        const accessPayload: TokenContent = {
            username: userInformation.username,
            iat: Date.now() + 1000 * 10,
            role: userInformation.role,
        }
        const token = await this.jwtService.signAsync(accessPayload, this.accessSecret);
        return token;
    }

    public async getRefreshToken(userInformation: UserInformation): Promise<string> {
        const refreshPayload: TokenContent = {
            username: userInformation.username,
            iat: Date.now() + 1000 * 60 * 60 * 24,
            role: userInformation.role,
        }
        const refreshToken = await this.jwtService.signAsync(refreshPayload, this.refreshSecret);
        return refreshToken;
    }

    public getRefreshSecret(): JwtSignOptions {
        return this.refreshSecret;
    }
    public getAcessSecret(): JwtSignOptions {
        return this.accessSecret;
    }
}
