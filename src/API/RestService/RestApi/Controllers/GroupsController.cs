using System;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestApi.Commands.GroupCommands;
using RestApi.Commands.GroupCommands.AddGroup;
using RestApi.DTOs.Group;
using RestApi.Queries.GroupQueries;

namespace RestApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class GroupsController : ControllerBase
	{
		private readonly IMediator _mediator;

		public GroupsController(IMediator mediator)
			=> _mediator = mediator;

		//// GET: api/Groups
		[HttpGet]
		public async Task<ApiResponse> GetGroups([FromQuery] int page = 0, [FromQuery] int count = 5)
		{
			var request = new GetGroupsQuery(page, count);
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse(response);
		}

		// GET: api/Groups/5
		[HttpGet("{groupId}")]
		public async Task<ApiResponse> GetGroup([FromRoute] long groupId)
		{
			GroupId typedGroupId = new(groupId);
			var request = new GetGroupQuery(typedGroupId);
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse(response);
		}

		// PUT: api/Groups/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{groupId}")]
		public async Task<ApiResponse> PutGroup([FromRoute] long groupId, [FromBody] UpdateGroupDto model)
		{
			UpdateGroupCommand request = new(new GroupId(groupId),
				model.Location,
				model.Name,
				model.Code,
				model.OwnerId);
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse($"Group with id: {response} has been updated", response);
		}

		[HttpPut("{groupId}/locations")]
		public async Task<ApiResponse> ChangeGroupLocation([FromRoute] GroupId groupId,
			[FromBody] ChangeGroupLocationDto model)
		{
			ChangeGroupLocationCommand changeGroupLocationCommand = new(groupId,
				model.Latitude,
				model.Latitude);
			var response = await _mediator.Send(changeGroupLocationCommand).ConfigureAwait(false);
			return new ApiResponse($"Location of a group with id: {groupId} has ben changed");
		}

		[HttpPut("{groupId}/rides")]
		public async Task<ApiResponse> AddRideToGroup([FromRoute] Guid groupId,
			[FromBody] AddRideToGroupCommand addRideToGroupCommand)
		{
			var response = await _mediator.Send(addRideToGroupCommand).ConfigureAwait(false);
			return new ApiResponse(response);
		}

		// POST: api/Groups
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ApiResponse> PostGroup([FromBody] AddGroupCommand addGroupCommand)
		{
			var groupId = await _mediator.Send(addGroupCommand).ConfigureAwait(false);
			return new ApiResponse($"Created group with id: {groupId}", groupId);
		}

		[HttpPost("{groupId}/users")]
		public async Task<ApiResponse> AddUserToGroup([FromRoute] long groupId,
			[FromBody] AddUserToGroupCommand addUserToGroupCommand)
		{
			addUserToGroupCommand.GroupId = new GroupId(groupId);
			var response = await _mediator.Send(addUserToGroupCommand).ConfigureAwait(false);
			return new ApiResponse(
				$"ApplicationUser with id: {addUserToGroupCommand.UserId} has been added to group with id: {groupId}.");
		}

		// DELETE: api/Groups/5
		[HttpDelete("{id}")]
		public async Task<ApiResponse> DeleteGroup(long id)
		{
			var response = await _mediator.Send(new DeleteGroupCommand(new GroupId(id))).ConfigureAwait(false);
			return new ApiResponse($"Group with id: {id} has been deleted", StatusCodes.Status200OK);
		}


		[HttpGet("~/api/users/{userId}/groups")]
		public async Task<ApiResponse> GetUserGroups([FromRoute] UserId userId)
		{
			var request = new GetUserGroupsQuery(userId);

			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}
	}
}