using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.DAL.Repositories.Group;
using MediatR;

namespace Carpool.RestAPI.Commands.Group
{
	public class DeleteGroupCommandHandler : AsyncRequestHandler<DeleteGroupCommand>
	{
		private readonly IGroupRepository _repository;

		public DeleteGroupCommandHandler(IGroupRepository repository)
			=> _repository = repository;

		protected override async Task Handle(DeleteGroupCommand request, CancellationToken cancellationToken)
		{
			var group = await _repository.GetByIdAsync(request.Id, cancellationToken).ConfigureAwait(false);
			_ = group ?? throw new ApiException($"Group with id: {request.Id} does not exist so it cannot be deleted.");
			_repository.Delete(group);

			try
			{
				await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbException ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}