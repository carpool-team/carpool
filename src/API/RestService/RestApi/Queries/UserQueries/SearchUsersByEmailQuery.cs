using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataTransferObjects.User;
using Domain.Contracts.Repositories;
using MediatR;

namespace RestApi.Queries.UserQueries
{
	public class SearchUsersByEmailQuery : IRequest<IReadOnlyCollection<UserGroupInviteDto>>
	{
		public SearchUsersByEmailQuery(string email, int page, int count)
		{
			Email = email;
			Page = page;
			Count = count;
		}
		public string Email { get; }
		public int Page { get; }
		public int Count { get; }
	}

	public class SearchUsersByEmailQueryHandler 
		: IRequestHandler<SearchUsersByEmailQuery, IReadOnlyCollection<UserGroupInviteDto>>
	{
		private readonly IUserRepository _userRepository;

		public SearchUsersByEmailQueryHandler(IUserRepository userRepository) 
			=> _userRepository = userRepository;

		public async Task<IReadOnlyCollection<UserGroupInviteDto>> Handle(SearchUsersByEmailQuery request,
			CancellationToken cancellationToken)
		{
			var users = await _userRepository.GetUsersByEmail(request.Email,
				request.Page,
				request.Count);

			var userDtos = users.Select(x => new UserGroupInviteDto(x.Id,
					x.FirstName,
					x.LastName,
					x.Email))
				.ToList();

			return userDtos;
		}
	}
}