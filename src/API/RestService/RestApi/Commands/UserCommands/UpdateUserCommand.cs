using System;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.User;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.UserCommands
{
	public class UpdateUserCommand : IRequest<UserId>
	{
		[JsonConstructor]
		public UpdateUserCommand(UserId userId, string firstName, string lastName)
		{
			UserId = userId;
			FirstName = firstName;
			LastName = lastName;
		}

		public UserId UserId { get; }
		public string FirstName { get; }
		public string LastName { get; }
	}

	public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, UserId>
	{
		private readonly IUserRepository _repository;

		public UpdateUserCommandHandler(IUserRepository repository)
			=> _repository = repository;

		public async Task<UserId> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
		{
			var user = await _repository.GetByIdAsync(request.UserId, cancellationToken).ConfigureAwait(false);
			_ = user ?? throw new NullReferenceException(nameof(user));
			user.FirstName = request.FirstName;
			user.LastName = request.LastName;

			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);

			return user.Id;
		}
	}
}