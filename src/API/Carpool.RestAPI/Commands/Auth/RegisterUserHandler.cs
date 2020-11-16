using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.Core.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Carpool.RestAPI.Commands.Auth
{
	public class RegisterUserHandler : IRequestHandler<RegisterUser, IdentityResult>
	{
		private readonly UserManager<ApplicationUser> _userManager;

		public RegisterUserHandler(UserManager<ApplicationUser> userManager)
			=> _userManager = userManager;

		public async Task<IdentityResult> Handle(RegisterUser request, CancellationToken cancellationToken)
		{
			var user = await _userManager.FindByEmailAsync(request.Email).ConfigureAwait(false);

			if (user != null)
				throw new ApiProblemDetailsException($"There is already a user with email: {request.Email}",
					StatusCodes.Status400BadRequest);

			user = new ApplicationUser(request.Email, request.Email, request.FirstName, request.LastName);
			var result = await _userManager.CreateAsync(user, request.Password).ConfigureAwait(false);
			return result.Succeeded ? result : throw new ApiException(result);
		}
	}
}