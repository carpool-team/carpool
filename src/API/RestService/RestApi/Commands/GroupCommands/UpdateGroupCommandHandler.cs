using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.Repositories.Group;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace RestApi.Commands.GroupCommands
{
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