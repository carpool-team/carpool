using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.User;
using MediatR;

namespace Carpool.RestAPI.Queries.User
{
	public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, Core.Models.User>
	{
		private readonly IUserRepository _repository;

		public GetUserByIdQueryHandler(IUserRepository repository)
			=> _repository = repository;

		public async Task<Core.Models.User> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
			=> await _repository.GetByIdAsNoTrackingAsync(request.UserId, cancellationToken).ConfigureAwait(false);
	}
}