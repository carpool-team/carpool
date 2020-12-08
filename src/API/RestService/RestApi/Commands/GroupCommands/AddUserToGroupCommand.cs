using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.Repositories;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using Domain.Contracts.Repositories.Intersections;
using Domain.Entities.Intersections;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace RestApi.Commands.GroupCommands
{
	public class AddUserToGroupCommand : IRequest
	{
		public AddUserToGroupCommand(GroupId? groupId, AppUserId appUserId)
		{
			GroupId = groupId;
			AppUserId = appUserId;
		}

		public AppUserId AppUserId { get; }

		public GroupId? GroupId { get; set; }
	}
	
	public class AddUserToGroupCommandHandler : AsyncRequestHandler<AddUserToGroupCommand>
	{
		private readonly IGroupRepository _repository;
		private readonly IUnitOfWork _unitOfWork;
		private readonly IUserGroupRepository _userGroupRepository;

		public AddUserToGroupCommandHandler(IGroupRepository repository,
			IUnitOfWork unitOfWork,
			IUserGroupRepository userGroupRepository)
		{
			_repository = repository;
			_unitOfWork = unitOfWork;
			_userGroupRepository = userGroupRepository;
		}

		protected override async Task Handle(AddUserToGroupCommand request, CancellationToken cancellationToken)
		{
			var groupId = request.GroupId
						  ?? throw new ApiProblemDetailsException("Group id cannot be null.",
							  StatusCodes.Status400BadRequest);

			var group = await _repository.GetByIdAsync(groupId, cancellationToken);
			_ = group
				?? throw new ApiProblemDetailsException($"Group with id: {groupId} does not exist",
					StatusCodes.Status404NotFound);

			var userGroup = new UserGroup(request.AppUserId, groupId);

			await _repository.AddUserToGroupAsync(userGroup, cancellationToken);
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