import {createPromiseAction} from '@adobe/redux-saga-promise';

export const GetUsersRides = {
  Trigger: 'GET_USERS_RIDES',
  Success: 'GET_USERS_RIDES_SUCCESS',
  Error: 'GET_USERS_RIDES_ERROR',
  Loading: 'GET_USERS_RIDES_LOADING',
};

export const GetUsersPastRides = {
  Trigger: 'GET_USERS_PAST_RIDES',
  Success: 'GET_USERS_PAST_RIDES_SUCCESS',
  Error: 'GET_USERS_PAST_RIDES_ERROR',
  Loading: 'GET_USERS_PAST_RIDES_LOADING',
};

export const GetPassengersRideRequests = {
  Trigger: 'GET_PASSENGERS_RIDE_REQUESTS',
  Success: 'GET_PASSENGERS_RIDE_REQUESTS_SUCCESS',
  Error: 'GET_PASSENGERS_RIDE_REQUESTS_ERROR',
  Loading: 'GET_PASSENGERS_RIDE_REQUESTS_LOADING',

  Watch: 'WATCH_PASSENGERS_RIDE_REQUESTS',
};

export const CreateRideRequest = {
  Trigger: 'CREATE_RIDE_REQUEST',

  PromiseTrigger: 'CREATE_RIDE_REQUEST.TRIGGER',
};

export const FindRides = {
  Trigger: 'FIND_RIDES',

  PromiseTrigger: 'FIND_RIDES.TRIGGER',
};

export const ResignFromRide = {
  Trigger: 'RESIGN_FROM_RIDE',

  PromiseTrigger: 'RESIGN_FROM_RIDE.TRIGGER',
};

export const DeleteRideRequest = {
  Trigger: 'DELETE_RIDE_REQUEST',

  PromiseTrigger: 'DELETE_RIDE_REQUEST.TRIGGER',
};

export const getUsersRides = () => ({
  type: GetUsersRides.Trigger,
});

export const getUsersRidesSuccess = payload => ({
  type: GetUsersRides.Success,
  payload,
});

export const getUsersRidesError = payload => ({
  type: GetUsersRides.Error,
  payload,
});

export const getUsersRidesLoading = () => ({
  type: GetUsersRides.Loading,
});

export const getUsersPastRides = () => ({type: GetUsersPastRides.Trigger});

export const getUsersPastRidesSuccess = payload => ({
  type: GetUsersPastRides.Success,
  payload,
});

export const getUsersPastRidesError = payload => ({
  type: GetUsersPastRides.Error,
  payload,
});

export const getUsersPastRidesLoading = () => ({
  type: GetUsersPastRides.Loading,
});

export const getPassengersRideRequests = () => ({
  type: GetPassengersRideRequests.Trigger,
});

export const getPassengersRideRequestsSuccess = payload => ({
  type: GetPassengersRideRequests.Success,
  payload,
});

export const getPassengersRideRequestsError = payload => ({
  type: GetPassengersRideRequests.Error,
  payload,
});

export const getPassengersRideRequestsLoading = () => ({
  type: GetPassengersRideRequests.Loading,
});

export const watchPassengersRideRequests = () => ({
  type: GetPassengersRideRequests.Watch,
});

export const createRideRequest = payload =>
  createPromiseAction(CreateRideRequest.Trigger)(payload);

export const findRides = payload =>
  createPromiseAction(FindRides.Trigger)(payload);

export const resignFromRide = payload =>
  createPromiseAction(ResignFromRide.Trigger)(payload);

export const deleteRideRequest = payload =>
  createPromiseAction(DeleteRideRequest.Trigger)(payload);
