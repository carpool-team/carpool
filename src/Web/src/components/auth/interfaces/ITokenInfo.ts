import { IRefreshToken } from "./IRefreshToken";
import { ITokenPayload } from "./ITokenPayload";

export interface ITokenInfo {
	token: string;
	expires: Date;
	refreshToken: IRefreshToken;
	payload: ITokenPayload;
}
