using System;
using System.ComponentModel.DataAnnotations;
using Carpool.Core.Models;

namespace Carpool.Core.DTOs.StopDTOs
{
	public class AddStopDTO
	{
		[Required] public Guid ParticipantId { get; set; }

		[Required] public Location Location { get; set; }

		public Guid UserId { get; set; }
	}
}