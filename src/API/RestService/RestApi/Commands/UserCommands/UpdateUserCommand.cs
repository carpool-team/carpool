using System;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.User;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.UserCommands
{
	public class UpdateUserCommand : IRequest<AppUserId>
	{
		[JsonConstructor]
		public UpdateUserCommand(AppUserId appUserId, string firstName, string lastName)
		{
			AppUserId = appUserId;
			FirstName = firstName;
			LastName = lastName;
		}

		public AppUserId AppUserId { get; }
		public string FirstName { get; }
		public string LastName { get; }
	}

	public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, AppUserId>
	{
		private readonly IUserRepository _repository;

		public UpdateUserCommandHandler(IUserRepository repository)
			=> _repository = repository;

		public async Task<AppUserId> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
		{
			var user = await _repository.GetByIdAsync(request.AppUserId, cancellationToken).ConfigureAwait(false);
			_ = user ?? throw new NullReferenceException(nameof(user));
			user.FirstName = request.FirstName;
			user.LastName = request.LastName;

			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);

			return user.Id;
		}
	}
}