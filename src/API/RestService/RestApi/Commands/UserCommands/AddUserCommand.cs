using System;
using System.Diagnostics;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.User;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using IdGen;
using MediatR;

namespace RestApi.Commands.UserCommands
{
	public class AddUserCommand : IRequest<ApplicationUser>
	{
		[JsonConstructor]
		public AddUserCommand(string firstName, string lastName, string email)
		{
			FirstName = firstName;
			LastName = lastName;
			Email = email;
		}

		public string FirstName { get; }

		public string LastName { get; }

		public string Email { get; }
	}
	
	public class AddUserCommandHandler : IRequestHandler<AddUserCommand, ApplicationUser>
	{
		private readonly IUserRepository _repository;

		public AddUserCommandHandler(IUserRepository repository)
			=> _repository = repository;

		public async Task<ApplicationUser> Handle(AddUserCommand request, CancellationToken cancellationToken)
		{
			var generator = new IdGenerator(0);
			var userId = new AppUserId(generator.CreateId());
			var user = new ApplicationUser(userId, request.Email, request.FirstName, request.LastName);
			try
			{
				await _repository.AddAsync(user, cancellationToken).ConfigureAwait(false);
				await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (Exception ex)
			{
				Debug.WriteLine(ex);
			}
			return user;
		}
	}
}