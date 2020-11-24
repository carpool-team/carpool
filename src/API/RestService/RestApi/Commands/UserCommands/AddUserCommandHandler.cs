using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.User;
using Domain.Entities;
using MediatR;

namespace RestApi.Commands.UserCommands
{
	public class AddUserCommandHandler : IRequestHandler<AddUserCommand, ApplicationUser>
	{
		private readonly IUserRepository _repository;

		public AddUserCommandHandler(IUserRepository repository)
			=> _repository = repository;

		public async Task<ApplicationUser> Handle(AddUserCommand request, CancellationToken cancellationToken)
		{
			var user = new ApplicationUser("test", "test", request.FirstName, request.LastName);

			await _repository.AddAsync(user, cancellationToken).ConfigureAwait(false);
			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);

			return user;
		}
	}
}