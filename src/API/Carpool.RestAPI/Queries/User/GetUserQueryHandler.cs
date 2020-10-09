using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.User;
using MediatR;

namespace Carpool.RestAPI.Queries.User
{
	public class GetUserQueryHandler : IRequestHandler<GetUsersQuery, List<Core.Models.User>>
	{
		private readonly IUserRepository _repository;

		public GetUserQueryHandler(IUserRepository repository)
		{
			_repository = repository;
		}

		public async Task<List<Core.Models.User>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
			=> await _repository.GetPartAsNoTrackingAsync(cancellationToken).ConfigureAwait(false);
	}
}