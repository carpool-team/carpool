using System.ComponentModel.DataAnnotations;

namespace RestApi.DTOs.Rating
{
	public class AddRatingDTO
	{
		[Required] public int Value { get; set; }
	}
}