using System;
using Carpool.Core.DTOs.GroupDTOs;
using Carpool.Core.Models;

namespace Carpool.Core.DTOs.GroupInvitesDTOs
{
	public class IndexGroupInviteDTO
	{
		public Guid Id { get; set; }

		public bool IsPending { get; set; }

		public IndexGroupDTO Group { get; set; }

		public Guid InvitedUserId { get; set; }

		public bool IsAccepted { get; set; }
		public DateTime DateAdded { get; set; }

		public static IndexGroupInviteDTO FromGroupInvite(GroupInvite groupInvite)
			=> new IndexGroupInviteDTO
			{
				Id = groupInvite.Id,
				IsPending = groupInvite.IsPending,
				Group = IndexGroupDTO.FromGroup(groupInvite.Group),
				InvitedUserId = groupInvite.InvitedUserId,
				IsAccepted = groupInvite.IsAccepted,
				DateAdded = groupInvite.DateAdded
			};
	}
}