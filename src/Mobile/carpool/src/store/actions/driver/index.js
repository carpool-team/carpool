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
