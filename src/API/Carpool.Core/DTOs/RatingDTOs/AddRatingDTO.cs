using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.DTOs.RatingDTOs
{
	public class AddRatingDTO
	{
		public int Value { get; set; }
		public Guid UserId { get; set; }
	}
}