import {createPromiseAction} from '@adobe/redux-saga-promise';

export const GetDriversRides = {
  Trigger: 'GET_DRIVERS_RIDES',
  Success: 'GET_DRIVERS_RIDES_SUCCESS',
  Error: 'GET_DRIVERS_RIDES_ERROR',
  Loading: 'GET_DRIVERS_RIDES_LOADING',
};

export const GetDriversPastRides = {
  Trigger: 'GET_DRIVERS_PAST_RIDES',
  Success: 'GET_DRIVERS_PAST_RIDES_SUCCESS',
  Error: 'GET_DRIVERS_PAST_RIDES_ERROR',
  Loading: 'GET_DRIVERS_PAST_RIDES_LOADING',
};

export const DeleteRide = {
  Trigger: 'DELETE_RIDE',

  PromiseTrigger: 'DELETE_RIDE.TRIGGER',
};

export const DeleteParticipant = {
  Trigger: 'DELETE_PARTICIPANT',

  PromiseTrigger: 'DELETE_PARTICIPANT.TRIGGER',
};

export const CreateSingleRide = {
  Trigger: 'CREATE_SINGLE_RIDE',

  PromiseTrigger: 'CREATE_SINGLE_RIDE.TRIGGER',
};

export const CreateRegularRide = {
  Trigger: 'CREATE_REGULAR_RIDE',

  PromiseTrigger: 'CREATE_REGULAR_RIDE.TRIGGER',
};

export const getDriversRides = () => ({
  type: GetDriversRides.Trigger,
});

export const getDriversRidesSuccess = payload => ({
  type: GetDriversRides.Success,
  payload,
});

export const getDriversRidesError = payload => ({
  type: GetDriversRides.Error,
  payload,
});

export const getDriversRidesLoading = () => ({
  type: GetDriversRides.Loading,
});

export const getDriversPastRides = () => ({
  type: GetDriversPastRides.Trigger,
});

export const getDriversPastRidesSuccess = payload => ({
  type: GetDriversPastRides.Success,
  payload,
});

export const getDriversPastRidesError = payload => ({
  type: GetDriversPastRides.Error,
  payload,
});

export const getDriversPastRidesLoading = () => ({
  type: GetDriversPastRides.Loading,
});

export const deleteRide = payload =>
  createPromiseAction(DeleteRide.Trigger)(payload);

export const deleteParticipant = payload =>
  createPromiseAction(DeleteParticipant.Trigger)(payload);

export const createSingleRide = payload =>
  createPromiseAction(CreateSingleRide.Trigger)(payload);

export const createRegularRide = payload =>
  createPromiseAction(CreateRegularRide.Trigger)(payload);
