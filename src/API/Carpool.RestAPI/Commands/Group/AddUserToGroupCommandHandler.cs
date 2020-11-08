using System;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.Core.Models.Intersections;
using Carpool.DAL.Repositories;
using Carpool.DAL.Repositories.Group;
using Carpool.DAL.Repositories.Intersections.UserGroup;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;

namespace Carpool.RestAPI.Commands.Group
{
	public class AddUserToGroupCommandHandler : AsyncRequestHandler<AddUserToGroupCommand>
	{
		private readonly IGroupRepository _repository;
		private readonly IUserGroupRepository _userGroupRepository;
		private readonly IUnitOfWork _unitOfWork;
		public AddUserToGroupCommandHandler(IGroupRepository repository, IUnitOfWork unitOfWork, IUserGroupRepository userGroupRepository)
		{
			_repository = repository;
			_unitOfWork = unitOfWork;
			_userGroupRepository = userGroupRepository;
		}

		protected override async Task Handle(AddUserToGroupCommand request, CancellationToken cancellationToken)
		{
			var groupId = request.GroupId ?? throw new ApiException($"Group id cannot be null.");
			var group = await _repository.GetByIdAsync(groupId, cancellationToken).ConfigureAwait(false);
			_ = group ?? throw new ApiException($"Group with id: {groupId} does not exist",
				    StatusCodes.Status400BadRequest);

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