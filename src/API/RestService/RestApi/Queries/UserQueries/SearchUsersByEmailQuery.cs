using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Contracts.Repositories;
using MediatR;
using RestApi.DTOs.User;

namespace RestApi.Queries.UserQueries
{
	public class SearchUsersByEmailQuery : IRequest<IReadOnlyCollection<InviteUserDto>>
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
		: IRequestHandler<SearchUsersByEmailQuery, IReadOnlyCollection<InviteUserDto>>
	{
		private readonly IUserRepository _userRepository;

		public SearchUsersByEmailQueryHandler(IUserRepository userRepository) 
			=> _userRepository = userRepository;

		public async Task<IReadOnlyCollection<InviteUserDto>> Handle(SearchUsersByEmailQuery request,
			CancellationToken cancellationToken)
		{
			var users = await _userRepository.GetUsersByEmail(request.Email,
				request.Page,
				request.Count);

			var userDtos = users.Select(x => new InviteUserDto(x.Id,
					x.FirstName,
					x.LastName,
                    x.Email))
				.ToList();

			return userDtos;
		}
	}
}