﻿using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Entities.Intersections;
using IdentifiersShared.Identifiers;

namespace Domain.Contracts.Repositories
{
	public interface IGroupRepository
	{
		Task<Group> GetByIdAsync(GroupId id, CancellationToken cancellationToken);
		Task<Group> GetByIdAsNoTrackingAsync(GroupId id, CancellationToken cancellationToken);
		Group GetByIdAsNoTracking(GroupId id);
		Task<bool> GroupCodeExists(string code);
		Task<List<Group>> GetGroupsByUserIdAsNoTrackingAsync(AppUserId appUserId,
		                                                     CancellationToken cancellationToken = default);

		Task AddUserToGroupAsync(UserGroup userGroup, CancellationToken cancellationToken = default);
		Task<bool> AnyWithIdAsync(GroupId groupId, CancellationToken cancellation = default);
		Task<bool> DoesUserExistsInGroup(GroupId groupId,
		                                 AppUserId appUserId,
		                                 CancellationToken cancellationToken = default);
		Task AddAsync(Group group, CancellationToken cancellationToken);
		void Delete(Group group);

		Task<ICollection<Ride>> GetGroupRides(GroupId groupId, CancellationToken cancellationToken = default);
	}
}