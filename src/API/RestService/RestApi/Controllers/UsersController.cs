using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.DatabaseContexts;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestApi.Commands.UserCommands;
using RestApi.DTOs.User;
using RestApi.Queries.UserQueries;

namespace RestApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class UsersController : Controller
	{
		private readonly CarpoolDbContext _context;
		private readonly IMediator _mediator;

		public UsersController(CarpoolDbContext context, IMediator mediator)
		{
			_context = context;
			_mediator = mediator;
		}

        [HttpGet("{appUserId}")]
		public async Task<ApiResponse> GetUser([FromRoute] AppUserId userId)
		{
			var request = new GetUserByIdQuery(userId);
			var response = await _mediator.Send(request);

			return new ApiResponse(response);
		}

		[HttpGet("~/api/groups/{groupId}/users")]
		public async Task<ApiResponse> GetGroupUsers([FromRoute] GroupId groupId)
		{
			var request = new GetGroupUsersQuery(groupId);
			var result = await _mediator.Send(request);
			return new ApiResponse(result);
		}

		[HttpPut("{appUserId}")]
		public async Task<ApiResponse> PutUser([FromRoute] AppUserId userId, [FromBody] UpdateUserDto model)
		{
			UpdateUserCommand request = new(userId,
				model.FirstName,
				model.LastName);

			var response = await _mediator.Send(request);

			return new ApiResponse(response);
		}

		[HttpPost]
		[AllowAnonymous]
		public async Task<ApiResponse> PostUser([FromBody] AddUserDto model)
		{
			AddUserCommand addUser = new(new AppUserId(model.AppUserId.Value),
				model.FirstName,
				model.LastName,
				model.Email);
			var response = await _mediator.Send(addUser);
			return new ApiResponse(response);
		}

		[HttpDelete("{appUserId}")]
		public async Task<ApiResponse> DeleteUser([FromRoute] AppUserId userId)
		{
			var request = new DeleteUserCommand(userId);

			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}
	}
}