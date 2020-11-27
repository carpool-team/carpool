using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.DatabaseContexts;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using RestApi.Commands.UserCommands;
using RestApi.Queries.UserQueries;

namespace RestApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UsersController : Controller
	{
		private readonly CarpoolDbContext _context;
		private readonly IMediator _mediator;

		public UsersController(CarpoolDbContext context, IMediator mediator)
		{
			_context = context;
			_mediator = mediator;
		}

		[HttpGet]
		public async Task<ApiResponse> GetUsers()
		{
			var request = new GetUsersQuery();
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse(response);
		}

		[HttpGet("{userId}")]
		public async Task<ApiResponse> GetUser([FromRoute] long userId)
		{
			UserId id = new(userId);
			var request = new GetUserByIdQuery(id);
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}

		[HttpGet("~/api/groups/{groupId}/users")]
		public async Task<ApiResponse> GetGroupUsers([FromRoute] GroupId groupId)
		{
			var result = await _mediator.Send(new GetGroupUsersQuery(groupId)).ConfigureAwait(false);
			return new ApiResponse(result);
		}
		
		[HttpPut("{id}")]
		public async Task<ApiResponse> PutUser([FromRoute] UserId id, [FromBody] UpdateUserCommand request)
		{
			request.UserId = id;
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(request);
		}
		
		[HttpPost]
		public async Task<ApiResponse> PostUser([FromBody] AddUserCommand request)
		{
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse(response);
		}

		[HttpDelete("{userId}")]
		public async Task<ApiResponse> DeleteUser([FromRoute()] UserId userId)
		{
			var request = new DeleteUserCommand(userId);

			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}
	}
}