using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.User;
using MediatR;

namespace Carpool.RestAPI.Queries.User
{
	public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, Core.Models.ApplicationUser>
	{
		private readonly IUserRepository _repository;

		public GetUserByIdQueryHandler(IUserRepository repository)
			=> _repository = repository;

		public async Task<Core.Models.ApplicationUser> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
			=> await _repository.GetByIdAsNoTrackingAsync(request.UserId, cancellationToken).ConfigureAwait(false);
	}
}