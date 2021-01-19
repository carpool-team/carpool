using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace RestApi.Commands.GroupCommands
{
	public class DeleteGroupCommand : IRequest
	{
		public DeleteGroupCommand(GroupId groupId, AppUserId appUserId)
		{
			GroupId = groupId;
			AppUserId = appUserId;
		}

		public GroupId GroupId { get; }
		public AppUserId AppUserId { get; }
	}
	
	public class DeleteGroupCommandHandler : AsyncRequestHandler<DeleteGroupCommand>
	{
		private readonly IGroupRepository _groupRepository;
		private readonly IUnitOfWork _unitOfWork;

		public DeleteGroupCommandHandler(IGroupRepository groupRepository, IUnitOfWork unitOfWork)
			=> (_groupRepository, _unitOfWork)
				= (groupRepository, unitOfWork);

		protected override async Task Handle(DeleteGroupCommand request, CancellationToken cancellationToken)
		{
			var group = await _groupRepository.GetByIdAsync(request.GroupId, cancellationToken).ConfigureAwait(false);
			_ = group
				?? throw new ApiProblemDetailsException(
					$"Group with id: {request.GroupId} does not exist so it cannot be deleted.",
					StatusCodes.Status400BadRequest);

			if (group.OwnerId != request.AppUserId)
				throw new ApiException("User does not have access to delete group with owner other than himself.",
					StatusCodes.Status403Forbidden);
			
			group.Rides.RemoveAll(x => x.Date >= DateTimeOffset.Now);
			group.GroupInvites.RemoveAll(x => x.IsPending);

			_groupRepository.Delete(group);

			try
			{
				await _unitOfWork.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex.InnerException);
			}
		}
	}
}