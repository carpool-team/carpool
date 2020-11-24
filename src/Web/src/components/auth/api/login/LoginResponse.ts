import ResponseBase from "../../../../api/responses/ResponseBase";
import { IRefreshToken } from "../../interfaces/IRefreshToken";

interface ILoginResponse {
	expires: Date;
	refreshToken: IRefreshToken;
	token: string;
}

export class LoginResponse extends ResponseBase<ILoginResponse> {
}
