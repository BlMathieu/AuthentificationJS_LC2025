export default interface TokenResponseInterface {
    accessToken: string,
    refreshToken: string,
}

export interface TokenContent {
    username: string,
    isAdmin: boolean,
    iat: number,
}