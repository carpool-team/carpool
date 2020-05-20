using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.DTOs.GroupDTOs
{
	public class ChangeGroupLocationDTO
	{
		public Guid LocationId { get; set; }
		public Guid GroupId { get; set; }
	}
}