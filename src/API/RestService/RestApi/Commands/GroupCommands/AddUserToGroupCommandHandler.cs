using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.Repositories;
using DataAccessLayer.Repositories.Group;
using DataAccessLayer.Repositories.Intersections.UserGroup;
using Domain.Entities.Intersections;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace RestApi.Commands.GroupCommands
{
	public class AddUserToGroupCommandHandler : AsyncRequestHandler<AddUserToGroupCommand>
	{
		private readonly IGroupRepository _repository;
		private readonly IUserGroupRepository _userGroupRepository;
		private readonly IUnitOfWork _unitOfWork;

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

			var group = await _repository.GetByIdAsync(groupId, cancellationToken).ConfigureAwait(false);
			_ = group ?? throw new ApiProblemDetailsException($"Group with id: {groupId} does not exist",
				    StatusCodes.Status404NotFound);

			var userGroup = new UserGroup(request.UserId, groupId);

			await _repository.AddUserToGroupAsync(userGroup, cancellationToken).ConfigureAwait(false);
			try
			{
				await _unitOfWork.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}