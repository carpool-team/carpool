import ResponseBase from "../../../../api/responses/ResponseBase";

/** Autocomplete user interface */
interface IAutocompleteUser {
		/** App userId */
		id: string;
		/** User first name */
		firstName: string;
		/** User last name */
		lastName: string;
}

/** Autocomplete response */
interface IUserAutocompleteResponseBody {
	/** Users collection */
	users: IAutocompleteUser[];
}

export class UserAutocompleteResponse extends ResponseBase<IUserAutocompleteResponseBody[]> {

}
