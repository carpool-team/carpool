import { RequestType } from "./enum/RequestType";
import { RequestEndpoint } from "./enum/RequestEndpoint";
import { IRequestQueries } from "./interfaces/IRequestQueries";

export const getRequestEndpoint: (endpoint: RequestEndpoint, queries?: IRequestQueries) => string = (endpoint, queries) => {
	switch (endpoint) {
		case RequestEndpoint.POST_ADD_GROUP:
			return "/groups";
		case RequestEndpoint.GET_GROUP_BY_ID:
			return `/groups/${queries.groupId}`;
		case RequestEndpoint.GET_USER_GROUPS:
			return `/users/${queries.userId}/groups`;
		case RequestEndpoint.GET_ALL_GROUPS:
			return `/groups`;
		case RequestEndpoint.PUT_ADD_RIDE_TO_GROUP:
			return `/groups/${queries.groupId}/rides`;
		case RequestEndpoint.PUT_ADD_USER_TO_GROUP:
			return `/groups/${queries.groupId}/users`;
		case RequestEndpoint.PUT_ADD_LOCATION_TO_GROUP:
			return `/groups/${queries.groupId}/locations`;
		case RequestEndpoint.DELETE_GROUP_BY_ID:
			return `/groups/${queries.groupId}`;
		case RequestEndpoint.GET_INVITES_BY_USER_ID:
			return `/users/${queries.userId}/groupInvites`;
		case RequestEndpoint.GET_ALL_INVITES:
			return `/groupinvites`;
		case RequestEndpoint.POST_INVITE:
			return `/groupinvites`;
		case RequestEndpoint.GET_INVITE_BY_ID:
			return `/groupinvites/${queries.inviteId}`;
		case RequestEndpoint.PUT_CHANGE_INVITE:
			return `/groupinvites/${queries.inviteId}`;
		case RequestEndpoint.DELETE_INVITE_BY_ID:
			return `/groupinvites/${queries.inviteId}`;
		case RequestEndpoint.GET_RIDES_AVAILABLE_BY_USER_ID:
			return queries?.userId ? `/rides?userId=${queries.userId}` : "/rides";
		case RequestEndpoint.GET_RIDES_PARTICIPATED_BY_USER_ID:
			return `/users/${queries.userId}/rides/participated`;
		case RequestEndpoint.GET_RIDES_OWNED_BY_USER_ID:
			return `/users/${queries.userId}/rides/owned`;
		case RequestEndpoint.PUT_RIDE_ADD_PARTICIPANT:
			return `/rides/${queries.rideId}/users`;
		default:
			throw "Unhandled endpoint";
	}
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
