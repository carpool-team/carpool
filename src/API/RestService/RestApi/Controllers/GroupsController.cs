using System;
using System.Threading.Tasks;
using Application.Commands.GroupCommands;
using Application.Commands.GroupCommands.AddGroup;
using Application.Queries.GroupQueries;
using AutoWrapper.Wrappers;
using DataTransferObjects.Group;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestApi.Extensions;

namespace RestApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class GroupsController : ControllerBase
	{
		private readonly IMediator _mediator;

		public GroupsController(IMediator mediator)
			=> _mediator = mediator;

        // GET: api/Groups/5
		[HttpGet("{groupId}")]
		public async Task<ApiResponse> GetGroup([FromRoute] GroupId groupId)
		{
			var request = new GetGroupQuery(groupId, User.GetUserId());
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse(response);
		}

        [HttpGet("~/api/users/{appUserId}/groups")]
        public async Task<ApiResponse> GetUserGroups([FromRoute] AppUserId appUserId)
		{
			if (User.GetUserId() != appUserId)
				throw new ApiException("User does not have permissions to view other user groups",
					StatusCodes.Status403Forbidden);
			
            var request = new GetUserGroupsQuery(appUserId);

            var response = await _mediator.Send(request).ConfigureAwait(false);

            return new ApiResponse(response);
        }

        [HttpGet("{groupId}/report")]
        public async Task<ApiResponse> GetGroupReport([FromRoute] GroupId groupId,
	        [FromQuery] DateTimeOffset startDate,
	        [FromQuery] DateTimeOffset endDate)
        {
	        GetGroupReportQuery request = new(groupId,
		        User.GetUserId(),
		        startDate,
		        endDate);

	        var response = await _mediator.Send(request);
	        
	        return new ApiResponse(response);
        }
        
		// PUT: api/Groups/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{groupId}")]
		public async Task<ApiResponse> PutGroup([FromRoute] GroupId groupId, [FromBody] UpdateGroupDto model)
		{
			UpdateGroupCommand request = new(groupId,
				model.Location,
				model.Name,
				model.Code,
				model.OwnerId,
				User.GetUserId());
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse($"Group with id: {response} has been updated", response);
		}

        // POST: api/Groups
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ApiResponse> PostGroup([FromBody] AddGroupCommand addGroupCommand)
		{
			if (User.GetUserId() != addGroupCommand.OwnerId)
				throw new ApiException("User does not have permissions to create group with owner other than himself.",
					StatusCodes.Status403Forbidden);
			
			var groupId = await _mediator.Send(addGroupCommand).ConfigureAwait(false);
			return new ApiResponse($"Created group with id: {groupId}", groupId);
		}

        // DELETE: api/Groups/5
		[HttpDelete("{groupId}")]
		public async Task<ApiResponse> DeleteGroup([FromRoute]GroupId groupId)
		{
			var response = await _mediator.Send(new DeleteGroupCommand(groupId, User.GetUserId())).ConfigureAwait(false);
			return new ApiResponse($"Group with id: {groupId} has been deleted", StatusCodes.Status200OK);
		}

		[HttpDelete("{groupId}/users/{appUserId}")]
		public async Task<ApiResponse> DeleteUserFromGroup([FromRoute] GroupId groupId,
		                                                   [FromRoute] AppUserId appUserId)
		{
			RemoveUserFromGroupCommand request = new(User.GetUserId(),
				appUserId,
				groupId);

			await _mediator.Send(request);

			return new ApiResponse(StatusCodes.Status204NoContent);
		}
    }
}