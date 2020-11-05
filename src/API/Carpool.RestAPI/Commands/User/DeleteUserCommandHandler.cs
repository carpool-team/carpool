using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.User;
using MediatR;

namespace Carpool.RestAPI.Commands.User
{
	public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, Core.Models.User>
	{
		private readonly IUserRepository _repository;

		public DeleteUserCommandHandler(IUserRepository repository)
			=> _repository = repository;

		public async Task<Core.Models.User> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
		{
			var user = await _repository.GetByIdAsync(request.UserId, cancellationToken).ConfigureAwait(false);
			_ = user ?? throw new NullReferenceException(nameof(user));

			_repository.Delete(user);
			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);

			return user;
		}
	}
}