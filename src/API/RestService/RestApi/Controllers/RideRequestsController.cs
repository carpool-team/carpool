using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataTransferObjects.RideRequest;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.Language.Intermediate;
using RestApi.Commands.RideRequestCommands;
using RestApi.Extensions;
using RestApi.Queries.RideRequestQueries;

namespace RestApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class RideRequestsController : ControllerBase
	{
		private readonly IMediator _mediator;
		
		public RideRequestsController(IMediator mediator) => _mediator = mediator;

		[HttpGet]
		public async Task<ApiResponse> GetRideRequests([FromQuery]bool isOwner = false)
		{
			if (isOwner)
			{
				GetOwnerRideRequestsQuery getOwnerRideRequests = new(User.GetUserId());
				var ownerRideRequests = await _mediator.Send(getOwnerRideRequests);

				return new ApiResponse(ownerRideRequests);
			}		
			GetParticipantRideRequestsQuery getParticipantRideRequests = new(User.GetUserId());
			var rideRequests = await _mediator.Send(getParticipantRideRequests);

			return new ApiResponse(rideRequests);
		}

		[HttpPost]
		public async Task<ApiResponse> AddRideRequest([FromBody] AddRideRequestDto addRideRequestDto)
		{
			AddRideRequestCommand request = new(addRideRequestDto.RideId,
				User.GetUserId(),
				addRideRequestDto.RideOwnerId,
				new Location(addRideRequestDto.Location.Longitude, addRideRequestDto.Location.Latitude));
			var rideRequestId = await _mediator.Send(request);

			return new ApiResponse(rideRequestId, StatusCodes.Status201Created);
		}
		
		[HttpPut]
		public async Task<ApiResponse> UpdateRideRequest([FromBody] UpdateRideRequestDto updateRideRequestDto)
		{
			UpdateRideRequestCommand request = new(updateRideRequestDto.RideRequestId,
				updateRideRequestDto.IsAccepted,
				User.GetUserId());
			
			await _mediator.Send(request);

			return new ApiResponse(StatusCodes.Status204NoContent);
		}

		[HttpDelete("{rideRequestId}")]
		public async Task<ApiResponse> ResignRideRequest([FromRoute] RideRequestId rideRequestId)
		{
			ResignRideRequestCommand request = new(User.GetUserId(), rideRequestId);

			await _mediator.Send(request);

			return new ApiResponse(StatusCodes.Status204NoContent);
		}
	}
}