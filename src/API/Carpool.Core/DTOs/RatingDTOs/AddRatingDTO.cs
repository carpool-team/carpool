using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Carpool.Core.DTOs.RatingDTOs
{
	public class AddRatingDTO
	{
		[Required]
		public int Value { get; set; }
	}
}