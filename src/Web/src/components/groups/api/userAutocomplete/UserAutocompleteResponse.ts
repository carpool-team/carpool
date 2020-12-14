import ResponseBase from "../../../../api/responses/ResponseBase";

/** Autocomplete user interface */
interface IAutocompleteUser {
	/** App userId */
	appUserId: string;
	/** User first name */
	firstName: string;
	/** User last name */
	lastName: string;
	/** Email matched */
	email: string;
}

export class UserAutocompleteResponse extends ResponseBase<IAutocompleteUser[]> {

}
