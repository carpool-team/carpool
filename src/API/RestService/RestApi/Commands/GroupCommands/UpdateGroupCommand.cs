using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataTransferObjects;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupCommands
{
	public class UpdateGroupCommand : IRequest<GroupId>
	{
		public UpdateGroupCommand(GroupId groupId,
			LocationDto? location, 
			string name, 
			string code, 
			AppUserId? ownerId, 
			AppUserId requestingUserId)
		{
			GroupId = groupId;
			Location = location != null ? new Location(location.Longitude, location.Latitude) : null;
			Name = name;
			Code = code;
			OwnerId = ownerId;
			RequestingUserId = requestingUserId;
		}

		public GroupId GroupId { get; }

		public Location? Location { get; }

		public string Name { get; }

		public string Code { get; }

		public AppUserId? OwnerId { get; }

		public AppUserId RequestingUserId { get; set; }
	}
	
	public class UpdateGroupCommandHandler : IRequestHandler<UpdateGroupCommand, GroupId>
	{
		private readonly IGroupRepository _repository;
		private readonly IUnitOfWork _unitOfWork;

		public UpdateGroupCommandHandler(IGroupRepository repository, IUnitOfWork unitOfWork)
			=> (_repository, _unitOfWork)
				= (repository, unitOfWork);


		public async Task<GroupId> Handle(UpdateGroupCommand request, CancellationToken cancellationToken = default)
		{
			var group = await _repository.GetByIdAsync(request.GroupId, cancellationToken).ConfigureAwait(false);
			_ = group
				?? throw new ApiProblemDetailsException($"Group with id: {request.GroupId} does not exist.",
					StatusCodes.Status400BadRequest);
			
			if (group.OwnerId != request.RequestingUserId)
				throw new ApiException("User does not have permissions to edit a group if he's not an owner", 
					StatusCodes.Status403Forbidden);

			group.Location = request.Location ?? group.Location;
			group.Name = !string.IsNullOrEmpty(request.Name) ? request.Name : group.Name;
			group.Code = !string.IsNullOrEmpty(request.Code) ? request.Code : group.Code;
			group.OwnerId = request.OwnerId ?? group.OwnerId;

			try
			{
				await _unitOfWork.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}

			return group.Id;
		}
	}
}