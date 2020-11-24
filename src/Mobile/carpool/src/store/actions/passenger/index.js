export const GetAllRides = {
  Trigger: 'GET_ALL_RIDES',
  Success: 'GET_ALL_RIDES_SUCCESS',
  Error: 'GET_ALL_RIDES_ERROR',
  Loading: 'GET_ALL_RIDES_LOADING',
};

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

export const getAllRides = () => ({
  type: GetAllRides.Trigger,
});

export const getAllRidesSuccess = payload => ({
  type: GetAllRides.Success,
  payload,
});

export const getAllRidesError = payload => ({
  type: GetAllRides.Error,
  payload,
});

export const getAllRidesLoading = () => ({
  type: GetAllRides.Loading,
});

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
