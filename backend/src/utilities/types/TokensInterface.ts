export default interface TokenResponseInterface {
    accessToken: string,
    refreshToken: string,
}
export interface UserInformation{
    username:string,
    role:string,
}

export interface TokenContent extends UserInformation {
    iat: number,
}