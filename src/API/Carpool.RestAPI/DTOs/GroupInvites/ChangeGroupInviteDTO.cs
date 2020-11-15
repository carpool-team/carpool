using System;
using System.ComponentModel.DataAnnotations;

namespace Carpool.RestAPI.DTOs.GroupInvites
{
	public class ChangeGroupInviteDTO
	{
		[Required] public Guid GroupInviteId { get; set; }

		[Required] public bool IsAccepted { get; set; }
	}
}