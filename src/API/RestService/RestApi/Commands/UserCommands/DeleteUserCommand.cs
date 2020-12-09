using System;
using System.Threading;
using System.Threading.Tasks;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.UserCommands
{
	public class DeleteUserCommand : IRequest<ApplicationUser>
	{
		[JsonConstructor]
		public DeleteUserCommand(AppUserId appUserId)
			=> AppUserId = appUserId;


		public AppUserId AppUserId { get; }
	}
	
	public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, ApplicationUser>
	{
		private readonly IUserRepository _userRepository;
		private readonly IUnitOfWork _unitOfWork;

		public DeleteUserCommandHandler(IUserRepository userRepository, IUnitOfWork unitOfWork)
			=> (_userRepository, _unitOfWork)
				= (userRepository, unitOfWork);

		public async Task<ApplicationUser> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
		{
			var user = await _userRepository.GetByIdAsync(request.AppUserId, cancellationToken).ConfigureAwait(false);
			_ = user ?? throw new NullReferenceException(nameof(user));

			_userRepository.Delete(user);
			await _unitOfWork.SaveAsync(cancellationToken).ConfigureAwait(false);

			return user;
		}
	}
}