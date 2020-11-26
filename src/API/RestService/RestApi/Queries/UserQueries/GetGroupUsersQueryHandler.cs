using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.User;
using MediatR;
using RestApi.DTOs.User;

namespace RestApi.Queries.UserQueries
{
	public class GetGroupUsersQueryHandler : IRequestHandler<GetGroupUsersQuery, List<IndexUserDto>>
	{
		private readonly IUserRepository _repository;

		public GetGroupUsersQueryHandler(IUserRepository repository)
			=> _repository = repository;


		public async Task<List<IndexUserDto>> Handle(GetGroupUsersQuery request, CancellationToken cancellationToken)
		{
			var users = await _repository.GetGroupUsersByGroupIdAsync(request.Id).ConfigureAwait(false);

			var userDtos = users.Select(x
					=> new IndexUserDto(x.Id, x.FirstName, x.LastName, x.Vehicle))
				.ToList();

			return userDtos;
		}
	}
}