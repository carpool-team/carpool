using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.DTOs.GroupDTOs
{
	public class AddRideToGroupDTO
	{
		public Guid RideId { get; set; }
		public Guid GroupId { get; set; }
	}
}