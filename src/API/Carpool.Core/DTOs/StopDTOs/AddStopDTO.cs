using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Carpool.Core.DTOs.StopDTOs
{
	public class AddStopDTO
	{
		[Required]
		public Guid ParticipantId { get; set; }

		[Required]
		public Coordinates Coordinates { get; set; }

        public Guid UserId { get; set; }
    }
}