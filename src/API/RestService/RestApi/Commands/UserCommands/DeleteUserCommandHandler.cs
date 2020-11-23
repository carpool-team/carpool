using System;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.User;
using Domain.Entities;
using MediatR;

namespace RestApi.Commands.UserCommands
{
	public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, ApplicationUser>
	{
		private readonly IUserRepository _repository;

		public DeleteUserCommandHandler(IUserRepository repository)
			=> _repository = repository;

		public async Task<ApplicationUser> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
		{
			var user = await _repository.GetByIdAsync(request.UserId, cancellationToken).ConfigureAwait(false);
			_ = user ?? throw new NullReferenceException(nameof(user));

			_repository.Delete(user);
			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);

			return user;
		}
	}
}