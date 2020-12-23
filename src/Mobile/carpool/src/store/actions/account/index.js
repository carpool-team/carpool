import {createPromiseAction} from '@adobe/redux-saga-promise';

export const ToggleActiveAccount = {
  Trigger: 'TOGGLE_ACTIVE_ACCOUNT',
};

export const GetGroups = {
  Trigger: 'GET_GROUPS',
  Success: 'GET_GROUPS_SUCCESS',
  Loading: 'GET_GROUPS_LOADING',
  Error: 'GET_GROUPS_ERROR',
};

export const GetUser = {
  Trigger: 'GET_USER',
  Success: 'GET_USER_SUCCESS',
  Loading: 'GET_USER_LOADING',
  Error: 'GET_USER_ERROR',
};

export const EditUser = {
  Trigger: 'EDIT_USER',

  PromiseTrigger: 'EDIT_USER.TRIGGER',
};

export const GetInvitations = {
  Trigger: 'GET_INVITATIONS',
  Success: 'GET_INVITATIONS_SUCCESS',
  Loading: 'GET_INVITATIONS_LOADING',
  Error: 'GET_INVITATIONS_ERROR',
  Watch: 'WATCH_INVITATIONS',
};

export const AcceptInvitation = {
  Trigger: 'ACCEPT_INVITATION',

  PromiseTrigger: 'ACCEPT_INVITATION.TRIGGER',
};

export const DeclineInvitation = {
  Trigger: 'DECLINE_INVITATION',

  PromiseTrigger: 'DECLINE_INVITATION.TRIGGER',
};

export const DeleteAccount = {
  Trigger: 'DELETE_ACCOUNT',

  PromiseTrigger: 'DELETE_ACCOUNT.TRIGGER',
};

export const LeaveGroup = {
  Trigger: 'LEAVE_GROUP',

  PromiseTrigger: 'LEAVE_GROUP.TRIGGER',
};

export const toggleActiveAccount = () => ({
  type: ToggleActiveAccount.Trigger,
});

export const getGroups = () => ({
  type: GetGroups.Trigger,
});

export const getGroupsSuccess = payload => ({
  type: GetGroups.Success,
  payload,
});

export const getGroupsError = payload => ({
  type: GetGroups.Error,
  payload,
});

export const getGroupsLoading = () => ({
  type: GetGroups.Error,
});

export const getInvitations = () => ({
  type: GetInvitations.Trigger,
});

export const getInvitationsSuccess = payload => ({
  type: GetInvitations.Success,
  payload,
});

export const getInvitationsError = payload => ({
  type: GetInvitations.Error,
  payload,
});

export const getInvitationsLoading = () => ({
  type: GetInvitations.Loading,
});

export const watchInvitations = () => ({type: GetInvitations.Watch});

export const acceptInvitation = payload =>
  createPromiseAction(AcceptInvitation.Trigger)(payload);

export const declineInvitation = payload =>
  createPromiseAction(DeclineInvitation.Trigger)(payload);

export const getUser = () => ({type: GetUser.Trigger});

export const getUserSuccess = payload => ({type: GetUser.Success, payload});

export const getUserError = payload => ({type: GetUser.Error, payload});

export const getUserLoading = () => ({type: GetUser.Loading});

export const editUser = payload =>
  createPromiseAction(EditUser.Trigger)(payload);

export const deleteAccount = () => createPromiseAction(DeleteAccount.Trigger)();

export const leaveGroup = payload =>
  createPromiseAction(LeaveGroup.Trigger)(payload);
