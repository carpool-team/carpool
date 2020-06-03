import { RequestType } from "./enum/RequestType";
import { RequestEndpoint } from "./enum/RequestEndpoint";

export const getRequestEndpoint: (
  endpoint?: RequestEndpoint,
  userId?: string,
  groupId?: string,
  inviteId?: string
) => string = (endpoint, userId, groupId, inviteId) => {
  switch (endpoint) {
    case RequestEndpoint.POST_ADD_GROUP:
      return "/groups";
    case RequestEndpoint.GET_GROUP_BY_ID:
      return `/groups/${groupId}`;
    case RequestEndpoint.GET_USER_GROUPS:
      return `/users/${userId}/groups`;
    case RequestEndpoint.GET_ALL_GROUPS:
      return `/groups`;
    case RequestEndpoint.PUT_ADD_RIDE_TO_GROUP:
      return `/groups/${groupId}/rides`;
    case RequestEndpoint.PUT_ADD_USER_TO_GROUP:
      return `/groups/${groupId}/users`;
    case RequestEndpoint.PUT_ADD_LOCATION_TO_GROUP:
      return `/groups/${groupId}/locations`;
    case RequestEndpoint.DELETE_GROUP_BY_ID:
      return `/groups/${groupId}`;
    case RequestEndpoint.GET_INVITES_BY_USER_ID:
      return `/users/${userId}/groupInvites`;
    case RequestEndpoint.GET_ALL_INVITES:
      return `/groupinvites`;
    case RequestEndpoint.POST_INVITE:
      return `/groupinvites`;
    case RequestEndpoint.GET_INVITE_BY_ID:
      return `/groupinvites/${inviteId}`;
    case RequestEndpoint.PUT_CHANGE_INVITE:
      return `/groupinvites/${inviteId}`;
    case RequestEndpoint.DELETE_INVITE_BY_ID:
      return `/groupinvites/${inviteId}`;
    default:
      return "";
  }
};

export const getRequestType: (type?: RequestType) => string = (type) => {
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
      return "";
  }
};
