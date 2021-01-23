import { ITokenPayload } from "./ITokenPayload";

export interface ITokenInfo {
	token: string;
	expires: Date;
	refreshToken: string;
	payload: ITokenPayload;
}
