using Carpool.Core.DTOs.GroupDTOs;
using Carpool.Core.DTOs.UserDTOs;
using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace Carpool.Core.DTOs.GroupInvitesDTOs
{
	public class IndexGroupInviteDTO
	{
		public bool IsPending { get; set; }

		public IndexGroupDTO Group { get; set; }

		public Guid InvitedUserId { get; set; }

		public bool IsAccepted { get; set; }

		public static IndexGroupInviteDTO FromGroupInvite(GroupInvite groupInvite)
		{
			return new IndexGroupInviteDTO()
			{
				IsPending = groupInvite.IsPending,
				Group = IndexGroupDTO.FromGroup(groupInvite.Group),
				InvitedUserId = groupInvite.InvitedUserId,
				IsAccepted = groupInvite.IsAccepted
			};
		}
	}
}