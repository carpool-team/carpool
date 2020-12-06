using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using RestApi.Commands.UserCommands;
using RestApi.DTOs.Rating;
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

		[HttpGet("~/api/users/{appUserId}/rating")]
		public async Task<ApiResponse> GetUserRatingByUserId([FromRoute] long userId)
		{
			AppUserId typedAppUserId = new(userId);
			var request = new GetUserRatingQuery(typedAppUserId);

			var usersRating = await _mediator.Send(request);

			return new ApiResponse(usersRating);
		}

		[HttpPost("~/api/users/{appUserId}/ratings")]
		public async Task<ApiResponse> AddUserRating([FromBody] AddUserRatingDto model, [FromRoute] long userId)
		{
			AppUserId typedAppUserId = new(userId);
			AddUserRatingCommand request = new(typedAppUserId, model.Value);

			var rating = await _mediator.Send(request);

			return new ApiResponse(rating);
		}
	}
}