using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.DTOs.GroupInvitesDTOs
{
	public class AddGroupInviteDTO
	{
		public Guid Id { get; set; }
		public Guid GroupId { get; set; }

		public Guid InvitedUserId { get; set; }
	}
}