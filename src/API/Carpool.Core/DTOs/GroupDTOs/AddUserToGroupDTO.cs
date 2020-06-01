using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Carpool.Core.DTOs.GroupDTOs
{
	public class AddUserToGroupDTO
	{
		[Required]
		public Guid UserId { get; set; }

		[Required]
		public Guid GroupId { get; set; }
	}
}