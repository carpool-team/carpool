using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using RestApi.Commands.UserCommands;
using RestApi.Queries.RatingQueries;

namespace RestApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RatingsController : Controller
	{
		private readonly IMediator _mediator;

		public RatingsController(IMediator mediator)
			=> _mediator = mediator;

		[HttpGet("~/api/users/{userId}/rating")]
		public async Task<ApiResponse> GetUserRatingByUserId([FromRoute] UserId userId)
		{
			var request = new GetUserRatingQuery(userId);

			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}

		[HttpPost("~/api/users/{userId}/ratings")]
		public async Task<ApiResponse> AddUserRating([FromBody] AddUserRatingCommand request, [FromRoute] UserId userId)
		{
			request.UserId = userId;
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}
	}
}