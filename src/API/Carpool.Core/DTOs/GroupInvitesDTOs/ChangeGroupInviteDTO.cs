using System;
using System.ComponentModel.DataAnnotations;

namespace Carpool.Core.DTOs.GroupInvitesDTOs
{
	public class ChangeGroupInviteDTO
	{
		[Required] public Guid GroupInviteId { get; set; }

		[Required] public bool IsAccepted { get; set; }
	}
}