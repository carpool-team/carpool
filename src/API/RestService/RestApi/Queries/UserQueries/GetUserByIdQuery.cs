using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.User;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Queries.UserQueries
{
	public class GetUserByIdQuery : IRequest<ApplicationUser>
	{
		[JsonConstructor]
		public GetUserByIdQuery(UserId userId)
			=> UserId = userId;

		public UserId UserId { get; }
	}
	
	public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, ApplicationUser>
	{
		private readonly IUserRepository _repository;

		public GetUserByIdQueryHandler(IUserRepository repository)
			=> _repository = repository;

		public async Task<ApplicationUser> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
			=> await _repository.GetByIdAsNoTrackingAsync(request.UserId, cancellationToken).ConfigureAwait(false);
	}
}