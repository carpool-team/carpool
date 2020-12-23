import RequestBase from "api/requests/RequestBase";
import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore from "../../../../api/requests/RequestCore";
import { UserAutocompleteResponse } from "./UserAutocompleteResponse";

export interface IUserAutocompleteQueries {
	email: string;
	page?: number;
	count?: number;
}

export class UserAutocompleteRequest extends RequestCore {
	constructor(init: {
		queries: IUserAutocompleteQueries,
	}) {
		super({
			properties: {
				method: RequestType.GET,
				endpoint: RequestEndpoint.AUTOCOMPLETE_USER,
				queries: {
					email: init.queries.email,
					page: init.queries.page,
					count: init.queries.count,
				},
			},
		});
	}
	async send() {
		return await super.fetch<UserAutocompleteResponse>();
	}
}
