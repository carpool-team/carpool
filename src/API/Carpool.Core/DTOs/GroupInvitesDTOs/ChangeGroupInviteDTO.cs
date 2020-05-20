using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.DTOs.GroupInvitesDTOs
{
	public class ChangeGroupInviteDTO
	{
		public Guid Id { get; set; }

		public bool IsAccepted { get; set; }
	}
}