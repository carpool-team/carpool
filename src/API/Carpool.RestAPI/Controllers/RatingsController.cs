using System;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.RestAPI.Commands.User;
using Carpool.RestAPI.Queries.Rating;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.RestAPI.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	public class RatingsController : Controller
	{
		private readonly IMediator _mediator;

		public RatingsController(IMediator mediator)
		{
			_mediator = mediator;
		}
		
		[HttpGet("~/api/users/{userId}/rating")]
		public async Task<ApiResponse> GetUserRatingByUserId([FromRoute] Guid userId)
		{
			var request = new GetUserRatingQuery(userId);

			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}

		[HttpPost("~/api/users/{userId}/ratings")]
		public async Task<ApiResponse> AddUserRating([FromBody] AddUserRatingCommand request, [FromRoute] Guid userId)
		{
			request.UserId = userId;
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}

	}
}