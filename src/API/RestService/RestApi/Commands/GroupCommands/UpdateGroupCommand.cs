using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.Repositories.Group;
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
		public UpdateGroupCommand(GroupId groupId, Location? location, string name, string code, UserId? ownerId)
		{
			GroupId = groupId;
			Location = location;
			Name = name;
			Code = code;
			OwnerId = ownerId;
		}

		public GroupId GroupId { get; }

		public Location? Location { get; }

		public string Name { get; }

		public string Code { get; }

		public UserId? OwnerId { get; }
	}
	
	public class UpdateGroupCommandHandler : IRequestHandler<UpdateGroupCommand, GroupId>
	{
		private readonly IGroupRepository _repository;

		public UpdateGroupCommandHandler(IGroupRepository repository)
			=> _repository = repository;


		public async Task<GroupId> Handle(UpdateGroupCommand request, CancellationToken cancellationToken = default)
		{
			var group = await _repository.GetByIdAsync(request.GroupId, cancellationToken).ConfigureAwait(false);
			_ = group
				?? throw new ApiProblemDetailsException($"Group with id: {request.GroupId} does not exist.",
					StatusCodes.Status400BadRequest);

			group.Location = request.Location ?? group.Location;
			group.Name = request.Name ?? group.Name;
			group.Code = request.Code ?? group.Code;
			group.OwnerId = request.OwnerId ?? group.OwnerId;

			try
			{
				await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}

			return group.Id;
		}
	}
}