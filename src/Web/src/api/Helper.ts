import { RequestType } from "./enum/RequestType";
import { RequestEndpoint } from "./enum/RequestEndpoint";
import { IRequestQueries } from "./interfaces/IRequestQueries";

export const getRequestEndpoint: (endpoint: RequestEndpoint, queries?: IRequestQueries) => string = (endpoint, queries) => {
	let ep: string = (() => {
		switch (endpoint) {
			case RequestEndpoint.POST_ADD_GROUP:
				return "/groups";
			case RequestEndpoint.GET_GROUP_BY_ID:
				return `/groups/${queries?.groupId}`;
			case RequestEndpoint.GET_USER_GROUPS:
				return `/users/${queries?.userId}/groups`;
			case RequestEndpoint.GET_ALL_GROUPS:
				return `/groups`;
			case RequestEndpoint.PUT_ADD_RIDE_TO_GROUP:
				return `/groups/${queries?.groupId}/rides`;
			case RequestEndpoint.PUT_ADD_USER_TO_GROUP:
				return `/groups/${queries?.groupId}/users`;
			case RequestEndpoint.PUT_ADD_LOCATION_TO_GROUP:
				return `/groups/${queries?.groupId}/locations`;
			case RequestEndpoint.DELETE_GROUP_BY_ID:
				return `/groups/${queries?.groupId}`;
			case RequestEndpoint.GET_INVITES_BY_USER_ID:
				return `/users/${queries?.userId}/groupInvites`;
			case RequestEndpoint.GET_ALL_INVITES:
				return `/groupinvites`;
			case RequestEndpoint.POST_INVITE:
				return `/groupinvites`;
			case RequestEndpoint.GET_INVITE_BY_ID:
				return `/groupinvites/${queries?.inviteId}`;
			case RequestEndpoint.PUT_CHANGE_INVITE:
				return `/groupinvites/${queries?.inviteId}`;
			case RequestEndpoint.DELETE_INVITE_BY_ID:
				return `/groupinvites/${queries?.inviteId}`;
			case RequestEndpoint.GET_RIDES_BY_USER_ID:
				return `/users/${queries.userId}/rides`;
			case RequestEndpoint.PUT_RIDE_ADD_PARTICIPANT:
				return `/rides/${queries?.rideId}/users`;
			case RequestEndpoint.LOGIN_USER:
				return "/auth/login";
			case RequestEndpoint.REGISTER_USER:
				return "/auth/register";
			default:
				throw "Unhandled endpoint";
		}
	})();
	if (queries?.page) {
		ep += "?page=" + queries.page;
	}

	if (queries?.count) {
		ep += "?count=" + queries.count;
	}

	if (queries?.owned) {
		ep += "?owned=" + queries.owned;
	}

	if (queries?.past) {
		ep += "?past=" + queries.past;
	}

	if (queries?.participated) {
		ep += "?participated=" + queries.participated;
	}

	return ep;
};

export const getRequestType: (type: RequestType) => string = (type) => {
	switch (type) {
		case RequestType.GET:
			return "GET";
		case RequestType.POST:
			return "POST";
		case RequestType.PUT:
			return "PUT";
		case RequestType.DELETE:
			return "DELETE";
		default:
			throw "Unhandled request type";
	}
};

export const isAuthEndpoint: (endpoint: RequestEndpoint) => boolean = ep => {
	switch (ep) {
		case RequestEndpoint.LOGIN_USER:
		case RequestEndpoint.REGISTER_USER:
			return true;
		default:
			return false;
	}
};
