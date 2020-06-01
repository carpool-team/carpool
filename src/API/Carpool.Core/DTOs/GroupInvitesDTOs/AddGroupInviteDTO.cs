using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Carpool.Core.DTOs.GroupInvitesDTOs
{
	public class AddGroupInviteDTO
	{
		public Guid Id { get; set; }

		[Required]
		public Guid GroupId { get; set; }

		[Required]
		public Guid InvitedUserId { get; set; }
	}
}