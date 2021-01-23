using System;
using System.Threading;
using System.Threading.Tasks;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace Application.Commands.UserCommands
{
	public class UpdateUserCommand : IRequest<AppUserId>
	{
		[JsonConstructor]
		public UpdateUserCommand(AppUserId appUserId, string firstName, string lastName, string email)
		{
			AppUserId = appUserId;
			FirstName = firstName;
			LastName = lastName;
			Email = email;
		}

		public AppUserId AppUserId { get; }
		public string FirstName { get; }
		public string LastName { get; }
		public string Email { get; }
	}

	public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, AppUserId>
	{
		private readonly IUserRepository _repository;
		private readonly IUnitOfWork _unitOfWork;

		public UpdateUserCommandHandler(IUserRepository repository, IUnitOfWork unitOfWork)
			=> (_repository, _unitOfWork)
				= (repository, unitOfWork);

		public async Task<AppUserId> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
		{
			var user = await _repository.GetByIdAsync(request.AppUserId, cancellationToken).ConfigureAwait(false);
			_ = user ?? throw new NullReferenceException(nameof(user));
			user.FirstName = request.FirstName;
			user.LastName = request.LastName;

			await _unitOfWork.SaveAsync(cancellationToken).ConfigureAwait(false);

			return user.Id;
		}
	}
}