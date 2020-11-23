using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.User;
using Domain.Entities;
using MediatR;

namespace RestApi.Queries.UserQueries
{
	public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, ApplicationUser>
	{
		private readonly IUserRepository _repository;

		public GetUserByIdQueryHandler(IUserRepository repository)
			=> _repository = repository;

		public async Task<ApplicationUser> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
			=> await _repository.GetByIdAsNoTrackingAsync(request.UserId, cancellationToken).ConfigureAwait(false);
	}
}