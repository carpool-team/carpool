using System;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Queries.GroupInviteQueries
{
	public class GetGroupInviteQuery : IRequest<GroupInvite>
	{
		public GetGroupInviteQuery(GroupInviteId groupInviteId, AppUserId appUserId)
		{
			GroupInviteId = groupInviteId;
			AppUserId = appUserId;
		}

		public GroupInviteId GroupInviteId { get; }
		public AppUserId AppUserId { get; }
	}
	
	public class GetGroupInviteQueryHandler : IRequestHandler<GetGroupInviteQuery, GroupInvite>
	{
		private readonly IGroupInviteRepository _repository;

		public GetGroupInviteQueryHandler(IGroupInviteRepository repository)
			=> _repository = repository;

		public async Task<GroupInvite> Handle(GetGroupInviteQuery request,
			CancellationToken cancellationToken)
		{
			var groupInvite = await _repository.GetByIdAsNoTrackingAsync(request.GroupInviteId, cancellationToken)
				.ConfigureAwait(false);

			if (groupInvite is null)
				throw new NullReferenceException();

			if (request.AppUserId != groupInvite.InvitedAppUserId || request.AppUserId != groupInvite.InvitingAppUserId)
				throw new ApiException("User does not have access to view group invite",
					StatusCodes.Status403Forbidden);
			
			return groupInvite;
		}
	}
}