using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Carpool.Core.DTOs.RideDTOs
{
	public class AddParticipantToRideDTO
	{
		[Required]
		public Guid ParticipantId { get; set; }
	}
}