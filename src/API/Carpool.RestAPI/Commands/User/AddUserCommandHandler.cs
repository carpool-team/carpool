using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.User;
using MediatR;

namespace Carpool.RestAPI.Commands.User
{
	public class AddUserCommandHandler : IRequestHandler<AddUserCommand, Core.Models.User>
	{
		private readonly IUserRepository _repository;

		public AddUserCommandHandler(IUserRepository repository)
			=> _repository = repository;

		public async Task<Core.Models.User> Handle(AddUserCommand request, CancellationToken cancellationToken)
		{
			var user = new Core.Models.User
			{
				FirstName = request.FirstName,
				LastName = request.LastName,
			};

			await _repository.AddAsync(user, cancellationToken).ConfigureAwait(false);
			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);

			return user;
		}
	}
}