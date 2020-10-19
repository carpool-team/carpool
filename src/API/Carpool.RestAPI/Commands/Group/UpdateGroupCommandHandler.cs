using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Group;
using MediatR;

namespace Carpool.RestAPI.Commands.Group
{
	public class UpdateGroupCommandHandler : IRequestHandler<UpdateGroupCommand, Guid>
	{
		private readonly IGroupRepository _repository;

		public UpdateGroupCommandHandler(IGroupRepository repository)
			=> _repository = repository;


		public async Task<Guid> Handle(UpdateGroupCommand request, CancellationToken cancellationToken = default)
		{
			var group = await _repository.GetByIdAsync(request.Id, cancellationToken).ConfigureAwait(false);
			group.LocationId = request.LocationId;
			group.Name = request.Name ?? group.Name;
			group.Code = request.Code ?? group.Code;
			group.OwnerId = request.OwnerId ?? group.OwnerId;
			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			return group.Id;
		}
	}
}