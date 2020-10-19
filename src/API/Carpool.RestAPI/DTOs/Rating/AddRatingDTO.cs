using System.ComponentModel.DataAnnotations;

namespace Carpool.RestAPI.DTOs.RatingDTOs
{
	public class AddRatingDTO
	{
		[Required] public int Value { get; set; }
	}
}