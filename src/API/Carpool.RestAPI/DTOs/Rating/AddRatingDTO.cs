using System.ComponentModel.DataAnnotations;

namespace Carpool.RestAPI.DTOs.Rating
{
	public class AddRatingDTO
	{
		[Required] public int Value { get; set; }
	}
}