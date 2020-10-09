using System.ComponentModel.DataAnnotations;

namespace Carpool.Core.DTOs.RatingDTOs
{
	public class AddRatingDTO
	{
		[Required] public int Value { get; set; }
	}
}