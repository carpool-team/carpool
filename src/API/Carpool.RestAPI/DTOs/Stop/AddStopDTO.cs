using System;
using System.ComponentModel.DataAnnotations;
using Carpool.Core.ValueObjects;

namespace Carpool.RestAPI.DTOs.Stop
{
    public class AddStopDTO
	{
		[Required] public Guid ParticipantId { get; set; }

		[Required] public Location Location { get; set; }

		public Guid UserId { get; set; }
	}
}