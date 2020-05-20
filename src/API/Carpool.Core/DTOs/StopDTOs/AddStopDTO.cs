using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.DTOs.StopDTOs
{
	public class AddStopDTO
	{
		public Guid UserId { get; set; }
		public Coordinates Coordinates { get; set; }
	}
}