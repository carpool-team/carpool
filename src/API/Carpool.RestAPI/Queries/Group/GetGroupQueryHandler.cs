using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Group;
using MediatR;

namespace Carpool.RestAPI.Queries.Group
{
	public class GetGroupQueryHandler : IRequestHandler<GetGroupQuery, Core.Models.Group>
	{
		private readonly IGroupRepository _repository;

		public GetGroupQueryHandler(IGroupRepository repository)
			=> _repository = repository;


		public async Task<Core.Models.Group> Handle(GetGroupQuery request, CancellationToken cancellationToken)
			=> await _repository.GetByIdAsNoTrackingAsync(request.Id, cancellationToken).ConfigureAwait(false);
	}
}