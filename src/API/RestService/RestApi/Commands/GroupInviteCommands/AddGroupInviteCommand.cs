using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.Repositories;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Generator;
using IdentifiersShared.Identifiers;
using IdGen;
using MediatR;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupInviteCommands
{
	public class AddGroupInviteCommand : IRequest<GroupInviteId>
	{
		[JsonConstructor]
		public AddGroupInviteCommand(GroupId groupId, AppUserId invitedAppUserId, AppUserId inviterId)
		{
			GroupId = groupId;
			InvitedAppUserId = invitedAppUserId;
			InviterId = inviterId;
		}

		public GroupId GroupId { get; set; }

		public AppUserId InvitedAppUserId { get; set; }

		public AppUserId InviterId { get; set; }
	}
	
	public class AddGroupInviteCommandHandler : IRequestHandler<AddGroupInviteCommand, GroupInviteId>
	{
		private readonly IGroupInviteRepository _groupInviteRepository;
		private readonly IGroupRepository _groupRepository;
		private readonly IUnitOfWork _unitOfWork;

		public AddGroupInviteCommandHandler(IGroupInviteRepository groupInviteRepository, IUnitOfWork unitOfWork, IGroupRepository groupRepository)
		{
			_groupInviteRepository = groupInviteRepository;
			_unitOfWork = unitOfWork;
			_groupRepository = groupRepository;
		}

		public async Task<GroupInviteId> Handle(AddGroupInviteCommand request,
			CancellationToken cancellationToken)
		{
			var group = await _groupRepository.GetByIdAsNoTrackingAsync(request.GroupId, cancellationToken);
			
			if(group.OwnerId != request.InviterId)
				throw new ApiException("Only owner can invite users to a group.", StatusCodes.Status403Forbidden);

			if (group.UserGroups.Any(x => x.AppUserId == request.InvitedAppUserId))
				throw new ApiException("User is already in a group", StatusCodes.Status409Conflict);

			IdGenerator idGenerator = new IdGenerator(IdGeneratorType.GroupInvite);
			var groupInvite = new GroupInvite
			{
				Id = new GroupInviteId(idGenerator.CreateId()),
				InvitingAppUserId = request.InviterId,
				InvitedAppUserId = request.InvitedAppUserId,
				IsAccepted = false,
				IsPending = true,
				DateAdded = DateTimeOffset.Now,
				GroupId = request.GroupId
			};

			await _groupInviteRepository.AddAsync(groupInvite, cancellationToken);
			await _unitOfWork.SaveAsync(cancellationToken);

			return groupInvite.Id;
		}
	}
}