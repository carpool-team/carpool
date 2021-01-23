using System;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Application.Commands.GroupCommands
{
	public class RemoveUserFromGroupCommand : IRequest
	{
		public RemoveUserFromGroupCommand(AppUserId requestingUserId, AppUserId appUserId, GroupId groupId)
		{
			RequestingUserId = requestingUserId;
			AppUserId = appUserId;
			GroupId = groupId;
		}

		public AppUserId RequestingUserId { get; }
		public AppUserId AppUserId { get; }
		public GroupId GroupId { get; }
	}
	
	public class RemoveUserFromGroupCommandHandler : AsyncRequestHandler<RemoveUserFromGroupCommand>
	{
		private readonly IGroupRepository _groupRepository;
		private readonly IUnitOfWork _unitOfWork;

		public RemoveUserFromGroupCommandHandler(IGroupRepository groupRepository, IUnitOfWork unitOfWork)
		{
			_groupRepository = groupRepository;
			_unitOfWork = unitOfWork;
		}

		protected override async Task Handle(RemoveUserFromGroupCommand request, CancellationToken cancellationToken)
		{
			var group = await _groupRepository.GetByIdAsync(request.GroupId, cancellationToken);

			if (group == default)
				throw new ApiException(StatusCodes.Status404NotFound);
			
			if (group.OwnerId != request.RequestingUserId 
			    && request.AppUserId != request.RequestingUserId)
				throw new ApiException(StatusCodes.Status403Forbidden);

			if (group.OwnerId == request.AppUserId)
				throw new ApiException("Owner cannot remove himself from the group",
					StatusCodes.Status403Forbidden);

			var hasOperationSucceeded = await group.RemoveUserFromGroup(request.AppUserId, cancellationToken);

			if (!hasOperationSucceeded)
				throw new ApiException("User with given id does not belong to the group",
					StatusCodes.Status404NotFound);

			group.Rides.RemoveAll(x => x.Date >= DateTimeOffset.Now && x.OwnerId == request.AppUserId);
			
			try
			{
				await _unitOfWork.SaveAsync(cancellationToken);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}