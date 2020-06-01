using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Carpool.Core.DTOs.GroupInvitesDTOs
{
	public class ChangeGroupInviteDTO
	{
		[Required]
		public Guid GroupInviteId { get; set; }

		[Required]
		public bool IsAccepted { get; set; }
	}
}