import { IRefreshToken } from "./IRefreshToken";

export interface ITokenInfo {
	token: string;
	expires: Date;
	refreshToken: IRefreshToken;
}
