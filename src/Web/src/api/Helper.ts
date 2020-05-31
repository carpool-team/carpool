import { RequestType } from "./enum/RequestType";
import { RequestEndpoint } from "./enum/RequestEndpoint";

export const getRequestEndpoint: (
  endpoint?: RequestEndpoint,
  userID?: string
) => string = (endpoint, userID) => {
  switch (endpoint) {
    case RequestEndpoint.GET_ALL_RIDES:
      return "/Rides";
    case RequestEndpoint.GET_USERS_RIDES:
      return `/Rides/GetUserRides/${userID}`;
    case RequestEndpoint.GET_USER_GROUPS:
      return `/users/${userID}/groups`;
    case RequestEndpoint.GET_USER_INVITATIONS:
      return `/GroupInvites/GetUserInvites/${userID}`;
    case RequestEndpoint.SEND_RIDE_REQUEST:
      return "/RideRequests";
    case RequestEndpoint.ADD_PARTICIPANT:
      return "/Rides/AddParticipant";
    case RequestEndpoint.CHANGE_INVITATION_STATE:
      return "/GroupInvites";
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
    default:
      return "";
  }
};
