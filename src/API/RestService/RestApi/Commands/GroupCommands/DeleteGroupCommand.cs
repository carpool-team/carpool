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
	public class DeleteGroupCommand : IRequest
	{
		public DeleteGroupCommand(GroupId groupId)
			=> GroupId = groupId;

		public GroupId GroupId { get; }
	}
	
	public class DeleteGroupCommandHandler : AsyncRequestHandler<DeleteGroupCommand>
	{
		private readonly IGroupRepository _repository;

		public DeleteGroupCommandHandler(IGroupRepository repository)
			=> _repository = repository;

		protected override async Task Handle(DeleteGroupCommand request, CancellationToken cancellationToken)
		{
			var group = await _repository.GetByIdAsync(request.GroupId, cancellationToken).ConfigureAwait(false);
			_ = group
				?? throw new ApiProblemDetailsException(
					$"Group with id: {request.GroupId} does not exist so it cannot be deleted.",
					StatusCodes.Status400BadRequest);

			_repository.Delete(group);

			try
			{
				await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex.InnerException);
			}
		}
	}
}