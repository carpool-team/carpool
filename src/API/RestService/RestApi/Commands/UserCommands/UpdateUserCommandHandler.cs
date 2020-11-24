using System;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.User;
using MediatR;

namespace RestApi.Commands.UserCommands
{
	public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, Guid>
	{
		private readonly IUserRepository _repository;

		public UpdateUserCommandHandler(IUserRepository repository)
			=> _repository = repository;

		public async Task<Guid> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
		{
			var user = await _repository.GetByIdAsync((Guid) request.UserId, cancellationToken).ConfigureAwait(false);
			_ = user ?? throw new NullReferenceException(nameof(user));
			user.FirstName = request.FirstName ?? user.FirstName;
			user.LastName = request.LastName ?? user.LastName;

			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);

			return user.Id;
		}
	}
}