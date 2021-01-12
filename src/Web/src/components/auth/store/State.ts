import { ITokenInfo } from "../interfaces/ITokenInfo";

/** Auth state interface */
export interface IAuthState {
	tokenInfo: ITokenInfo;
	initializing: boolean;
}
