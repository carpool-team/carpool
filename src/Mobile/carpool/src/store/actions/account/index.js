export const ToggleActiveAccount = {
  Trigger = "TOGGLE_ACTIVE_ACCOUNT"
}

export const GetGroups = {
  Trigger = "GET_GROUPS",
  Success: "GET_GROUPS_SUCCESS",
  Loading: "GET_GROUPS_LOADING",
  Error: "GET_GROUPS_ERROR",
}

export const GetInvitations = {
  Trigger: "GET_INVITATIONS",
  Success: "GET_INVITATIONS_SUCCESS",
  Loading: "GET_INVITATIONS_LOADING",
  Error: "GET_INVITATIONS_ERROR",
}

export const toggleActiveAccount = () => ({
  type: ToggleActiveAccount.Trigger
})

export const getGroups = () => ({
  type: GetGroups.Trigger
})

export const getGroupsSuccess = (payload) => ({
  type: GetGroups.Success,
  payload
})

export const getGroupsError = (payload) => ({
  type: GetGroups.Error,
  payload
})

export const getGroupsLoading = () => ({
  type: GetGroups.Error,
})

export const getInvitations = () => ({
  type: GetInvitations.Trigger
})

export const getInvitationsSuccess = (payload) => ({
  type: GetInvitations.Success,
  payload
})

export const getInvitationsError = (payload) => ({
  type: GetInvitations.Error,
  payload
})

export const getInvitationsLoading = () => ({
  type: GetInvitations.Loading
})