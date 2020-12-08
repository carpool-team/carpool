using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Contracts.Repositories;
using Domain.Entities;
using MediatR;

namespace RestApi.Queries.UserQueries
{
	public class GetUsersQuery : IRequest<List<ApplicationUser>> { }
	
	public class GetUserQueryHandler : IRequestHandler<GetUsersQuery, List<ApplicationUser>>
	{
		private readonly IUserRepository _repository;

		public GetUserQueryHandler(IUserRepository repository)
			=> _repository = repository;

		public async Task<List<ApplicationUser>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
			=> await _repository.GetPartAsNoTrackingAsync(cancellationToken).ConfigureAwait(false);
	}
}