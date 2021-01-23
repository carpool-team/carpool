import ResponseBase from "../../../../api/responses/ResponseBase";

interface ILoginResponse {
	expires: Date;
	refreshToken: string;
	token: string;
}

export class LoginResponse extends ResponseBase<ILoginResponse> {
}
