using System;
using IdentifiersShared.Identifiers;

namespace RestApi.DTOs.GroupInvites
{
	public class IndexGroupInviteDTO
	{
		public IndexGroupInviteDTO(GroupInviteId id,
		                           bool isPending,
		                           bool isAccepted,
		                           GroupId groupId,
		                           string groupName,
		                           UserId invitedUserId,
		                           DateTime dateAdded)
		{
			Id = id;
			IsPending = isPending;
			IsAccepted = isAccepted;
			GroupId = groupId;
			GroupName = groupName;
			InvitedUserId = invitedUserId;
			DateAdded = dateAdded;
		}

		public GroupInviteId Id { get; set; }

		public bool IsPending { get; set; }
		public bool IsAccepted { get; set; }

		public GroupId GroupId { get; set; }
		public string GroupName { get; set; }

		public UserId InvitedUserId { get; set; }

		public DateTime DateAdded { get; set; }
	}
}