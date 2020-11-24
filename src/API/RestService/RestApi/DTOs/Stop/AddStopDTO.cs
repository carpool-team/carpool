using System;
using System.ComponentModel.DataAnnotations;
using Domain.ValueObjects;

namespace RestApi.DTOs.Stop
{
	public class AddStopDTO
	{
		[Required] public Guid ParticipantId { get; set; }

		[Required] public Location Location { get; set; }

		public Guid UserId { get; set; }
	}
}