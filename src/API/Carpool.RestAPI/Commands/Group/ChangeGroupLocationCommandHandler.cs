using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.DAL.Repositories.Group;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Carpool.RestAPI.Commands.Group
{
	public class ChangeGroupLocationCommandHandler : AsyncRequestHandler<ChangeGroupLocationCommand>
	{
		private readonly IGroupRepository _repository;

		public ChangeGroupLocationCommandHandler(IGroupRepository repository)
			=> _repository = repository;

		protected override async Task Handle(ChangeGroupLocationCommand request, CancellationToken cancellationToken)
		{
			var group = await _repository.GetByIdAsync(request.GroupId, cancellationToken).ConfigureAwait(false);
			group.LocationId = request.LocationId;
			try
			{
				await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}