using System;

namespace Carpool.RestAPI.DTOs.GroupInvitesDTOs
{
	public class IndexGroupInviteDTO
	{
		public IndexGroupInviteDTO(Guid id,
		                           bool isPending,
		                           bool isAccepted,
		                           Guid groupId,
		                           string groupName,
		                           Guid invitedUserId,
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

		public Guid Id { get; set; }

		public bool IsPending { get; set; }
		public bool IsAccepted { get; set; }

		public Guid GroupId { get; set; }
		public string GroupName { get; set; }

		public Guid InvitedUserId { get; set; }

		public DateTime DateAdded { get; set; }
	}
}