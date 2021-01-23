using System;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;

namespace Application.Commands.UserCommands
{
	public class AddUserCommand : IRequest<ApplicationUser>
	{
		[JsonConstructor]
		public AddUserCommand(AppUserId appUserId, string firstName, string lastName, string email)
		{
			FirstName = firstName;
			LastName = lastName;
			Email = email;
            AppUserId = appUserId;
        }

		public AppUserId AppUserId { get; }

		public string FirstName { get; }

		public string LastName { get; }

		public string Email { get; }
	}
	
	public class AddUserCommandHandler : IRequestHandler<AddUserCommand, ApplicationUser>
	{
		private readonly IUserRepository _userRepository;
		private readonly IUnitOfWork _unitOfWork;

		public AddUserCommandHandler(IUserRepository userRepository, IUnitOfWork unitOfWork)
			=> (_userRepository, _unitOfWork)
				= (userRepository, unitOfWork);

		public async Task<ApplicationUser> Handle(AddUserCommand request, CancellationToken cancellationToken)
        {
            var appUserId = request.AppUserId;
			var user = new ApplicationUser(appUserId, request.Email, request.FirstName, request.LastName);
			try
			{
				await _userRepository.AddAsync(user, cancellationToken).ConfigureAwait(false);
				await _unitOfWork.SaveAsync(cancellationToken).ConfigureAwait(false);
                return user;

			}
			catch (Exception ex)
            {
                throw new ApiException(ex);
            }
		}
	}
}