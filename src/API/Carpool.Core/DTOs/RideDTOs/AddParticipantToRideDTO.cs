using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.DTOs.RideDTOs
{
	public class AddParticipantToRideDTO
	{
		public Guid ParticipantId { get; set; }
		public Guid RideId { get; set; }
	}
}