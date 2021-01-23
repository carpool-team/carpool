using System;
using DataTransferObjects.Group;
using DataTransferObjects.User;
using IdentifiersShared.Identifiers;
using Newtonsoft.Json;

namespace DataTransferObjects.GroupInvites
{
    public record UpdateGroupInviteDto([property: JsonProperty("isAccepted")] bool IsAccepted);

	public record GroupInviteDto([JsonProperty("id")]GroupInviteId GroupInviteId,
		[JsonProperty("isAccepted")] bool IsAccepted,
		[JsonProperty("isPending")] bool IsPending,
		[JsonProperty("group")] GroupDto GroupDto,
		[JsonProperty("invitingUser")] InvitingUserDto InvitingUser,
		[JsonProperty("invitedUser")] InvitedUserDto InvitedUser,
		[JsonProperty("dateAdded")]DateTimeOffset DateAdded);
}