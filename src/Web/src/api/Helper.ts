import { RequestEndpoint } from "./enum/RequestEndpoint";
import { IRequestQueries } from "./interfaces/IRequestQueries";

export const getRequestEndpoint: (
	endpoint: RequestEndpoint,
	queries?: IRequestQueries
) => string = (endpoint, queries) => {
	let ep: string = (() => {
		switch (endpoint) {
			//#region GROUPS
			case RequestEndpoint.POST_ADD_GROUP:
				return "/groups";
			case RequestEndpoint.PUT_UPDATE_GROUP:
				return `/groups/${queries.groupId}/`;
			case RequestEndpoint.GET_GROUP_BY_ID:
				return `/groups/${queries.groupId}`;
			case RequestEndpoint.GET_USER_GROUPS:
				return `/users/${queries.userId}/groups`;
			case RequestEndpoint.DELETE_GROUP_BY_ID:
				return `/groups/${queries.groupId}`;
			case RequestEndpoint.GET_GROUP_USERS:
				return `/groups/${queries.groupId}/users`;
			case RequestEndpoint.LEAVE_GROUP:
				return `/groups/${queries.groupId}/users/${queries.userId}`;
			//#endregion
			//#region GROUP INVITES
			case RequestEndpoint.GET_INVITES_BY_USER_ID:
				return `/users/${queries?.userId}/group-invites`;
			case RequestEndpoint.GET_ALL_INVITES:
				return `/groupinvites`;
			case RequestEndpoint.POST_INVITE:
				return `/groupinvites`;
			case RequestEndpoint.GET_INVITE_BY_ID:
				return `/groupinvites/${queries.inviteId}`;
			case RequestEndpoint.PUT_CHANGE_INVITE:
				return `/groupinvites/${queries.inviteId}`;
			case RequestEndpoint.DELETE_INVITE_BY_ID:
				return `/groupinvites/${queries?.inviteId}`;
			//#endregion
			//#region USERS
			case RequestEndpoint.LOGIN_USER:
				return "/auth/login";
			case RequestEndpoint.REGISTER_USER:
				return "/auth/register";
			case RequestEndpoint.REFRESH_TOKEN:
				return "/auth/refresh-token";
			case RequestEndpoint.AUTOCOMPLETE_USER:
				return "/users";
			case RequestEndpoint.GET_USER_BY_APPUSERID:
				return "/users/" + queries.userId;
			case RequestEndpoint.UPDATE_USER_DATA:
				return "/users/" + queries.userId;
			//#endregion
			//#region RIDES
			case RequestEndpoint.GET_RIDES_BY_USER_ID:
				return `/users/${queries.userId}/rides`;
			case RequestEndpoint.GET_RIDES_BY_GROUP_ID:
				return `/groups/${queries.groupId}/rides`;
			case RequestEndpoint.POST_RIDE:
				return "/rides/";
			case RequestEndpoint.POST_RIDE_RECURRING:
				return "/rides/recurring";
			//#endregion
			//#region RIDE REQUESTS
			case RequestEndpoint.GET_RIDE_REQS:
				return "/riderequests";
			case RequestEndpoint.PUT_UPDATE_RIDE_REQ:
				return "/riderequests";
			case RequestEndpoint.POST_ADD_RIDE_REQ:
				return "/riderequests";
			//#endregion
			default:
				throw "Unhandled endpoint";
		}
	})();
	const query = [];
	if (queries) {
		Object.keys(queries).forEach((key) => {
			if (queries[key]) {
				query.push(`${key}=${queries[key]}`);
			}
		});
	}
	if (query.length > 0) {
		ep += "?" + query.join("&");
	}
	return ep;
};

export const getUrl: (endpoint: RequestEndpoint) => string = (ep) => {
	switch (ep) {
		case RequestEndpoint.LOGIN_USER:
		case RequestEndpoint.REGISTER_USER:
		case RequestEndpoint.UPDATE_USER_DATA:
			return process.env.AUTH_URL;
		default:
			return process.env.REST_URL;
	}
};
