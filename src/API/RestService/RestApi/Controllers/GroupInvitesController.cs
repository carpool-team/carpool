using System.Threading.Tasks;
using Application.Commands.GroupInviteCommands;
using Application.Queries.GroupInviteQueries;
using AutoWrapper.Wrappers;
using DataTransferObjects.GroupInvites;
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
	public class GroupInvitesController : Controller
	{
		private readonly IMediator _mediator;

		public GroupInvitesController(IMediator mediator)
			=> _mediator = mediator;

        [HttpGet("~/api/users/{appUserId}/group-invites")]
        public async Task<ApiResponse> GetUserGroupInvites([FromRoute] AppUserId appUserId)
		{
			if (User.GetUserId() != appUserId)
				throw new ApiException("User does not have access to other user group invites",
					StatusCodes.Status401Unauthorized);
			
            var request = new GetUserGroupInvitesQuery(appUserId);

            var response = await _mediator.Send(request).ConfigureAwait(false);

            return new ApiResponse(response);
        }

		// GET: api/GroupInvites/5
		[HttpGet("{groupInviteId}")]
		public async Task<ApiResponse> GetGroupInvite([FromRoute] long groupInviteId)
		{
			GetGroupInviteQuery request = new(new GroupInviteId(groupInviteId), User.GetUserId());

			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse(response);
		}

		// PUT: api/GroupInvites/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{groupInviteId}")]
		public async Task<ApiResponse> PutGroupInvite([FromBody] UpdateGroupInviteDto model,
			[FromRoute] long groupInviteId)
		{
			GroupInviteId typedGroupInviteId = new(groupInviteId);
			UpdateGroupInviteCommand request = new(typedGroupInviteId, model.IsAccepted, User.GetUserId());

			await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse($"Group Invite with id: {groupInviteId} has been updated", groupInviteId);
		}

		// POST: api/GroupInvites
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ApiResponse> PostGroupInvite(AddGroupInviteCommand request)
		{
			if (request.InviterId != User.GetUserId())
				throw new ApiException("Only owner can invite users to a group.", StatusCodes.Status403Forbidden);
			
			var groupInvite = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse($"Group Invite was created with id: {groupInvite}", groupInvite,
				StatusCodes.Status201Created);
		}

		// DELETE: api/GroupInvites/5
		[HttpDelete("{groupInviteId}")]
		public async Task<ApiResponse> DeleteGroupInvite(long groupInviteId)
		{
			GroupInviteId typedGroupInviteId = new(groupInviteId);
			DeleteGroupInviteCommand request = new(typedGroupInviteId, User.GetUserId());
			var response = await _mediator.Send(request).ConfigureAwait(false);

			return new ApiResponse($"Group Invite with id: {response} has been deleted");
		}
    }
}