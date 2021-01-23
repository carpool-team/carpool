using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataTransferObjects.User;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace Application.Queries.UserQueries
{
	public class GetGroupUsersQuery : IRequest<List<IndexUserDto>>
	{
		[JsonConstructor]
		public GetGroupUsersQuery(GroupId id)
			=> Id = id;

		public GroupId Id { get; }
	}
	
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