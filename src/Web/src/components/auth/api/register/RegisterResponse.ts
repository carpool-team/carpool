import ResponseBase from "../../../../api/responses/ResponseBase";

interface IRegisterResponse {
	message: string;
}

export class RegisterResponse extends ResponseBase<IRegisterResponse> {

}
