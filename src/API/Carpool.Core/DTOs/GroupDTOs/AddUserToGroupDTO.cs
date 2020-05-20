using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.DTOs.GroupDTOs
{
	public class AddUserToGroupDTO
	{
		public Guid UserId { get; set; }
		public Guid GroupId { get; set; }
	}
}