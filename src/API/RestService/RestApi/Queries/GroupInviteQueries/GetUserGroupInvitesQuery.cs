using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataTransferObjects;
using DataTransferObjects.GroupDtos;
using DataTransferObjects.GroupInvitesDtos;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RestApi.DTOs.User;

namespace RestApi.Queries.GroupInviteQueries
{
	public class GetUserGroupInvitesQuery : IRequest<IEnumerable<GroupInviteDto>>
	{
		[JsonConstructor]
		public GetUserGroupInvitesQuery(AppUserId appUserId)
			=> AppUserId = appUserId;

		public AppUserId AppUserId { get; set; }
	}
	
	public class GetUserGroupInvitesQueryHandler 
		: IRequestHandler<GetUserGroupInvitesQuery, IEnumerable<GroupInviteDto>>
	{
		private readonly IGroupInviteRepository _repository;

		public GetUserGroupInvitesQueryHandler(IGroupInviteRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<GroupInviteDto>> Handle(GetUserGroupInvitesQuery request,
			CancellationToken cancellationToken)
		{
			var groupInvites = await _repository.GetUserGroupPendingInvitesByUserIdAsNoTrackingAsync(request.AppUserId).ToListAsync();

			try
			{
				var groupInviteDtos = groupInvites.Select(x => new GroupInviteDto(x.Id,
						x.IsAccepted,
						x.IsPending,
						new GroupDto(x.Group.UserGroups.Count,
							x.Group.Id,
							new LocationDto(x.Group.Location.Longitude, x.Group.Location.Latitude),
							x.Group.OwnerId,
							x.Group.Name),
						new InvitingUserDto(x.InvitingApplicationUser.Id,
							x.InvitingApplicationUser.FirstName,
							x.InvitingApplicationUser.LastName),
						new InvitedUserDto(x.InvitedApplicationUser.Id,
							x.InvitedApplicationUser.FirstName,
							x.InvitedApplicationUser.LastName),
						x.DateAdded))
					.ToList();
				return groupInviteDtos;
			}
			catch (Exception ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}