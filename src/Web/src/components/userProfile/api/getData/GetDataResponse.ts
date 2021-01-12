import ResponseBase from "../../../../api/responses/ResponseBase";
import { IGroup } from "../../../groups/interfaces/IGroup";

interface IGetDataResponse {
	email: string;
	firstName: string;
	lastName: string;
	userGroups: Array<IGroup>;
	ratings: Array<any>;
	vehicle: any;
	rating: number;
	id: string;
}

export class GetDataResponse extends ResponseBase<IGetDataResponse> {
}
