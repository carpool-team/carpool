using System;
using DataTransferObjects.GroupDtos;
using Newtonsoft.Json;
using RestApi.DTOs.User;

namespace DataTransferObjects.GroupInvitesDtos
{
    public record UpdateGroupInviteDto([property: JsonProperty("isAccepted")] bool IsAccepted);

	public record GroupInviteDto([JsonProperty("isAccepted")] bool IsAccepted,
		[JsonProperty("isPending")] bool IsPending,
		[JsonProperty("group")] GroupDto GroupDto,
		[JsonProperty("invitingUser")] InvitingUserDto InvitingUser,
		[JsonProperty("invitedUser")] InvitedUserDto InvitedUser,
		[JsonProperty("dateAdded")]DateTime DateAdded);
}