using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.Core.Models;
using Hellang.Middleware.ProblemDetails;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.RestAPI.Commands.Auth
{
    public class RegisterUserHandler : IRequestHandler<RegisterUser, IdentityResult>
    {
        private readonly UserManager<Core.Models.ApplicationUser> _userManager;

        public RegisterUserHandler(UserManager<Core.Models.ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IdentityResult> Handle(RegisterUser request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(request.Email).ConfigureAwait(false);

            if (user != null)
                throw new ApiProblemDetailsException($"There is already a user with email: {request.Email}", StatusCodes.Status400BadRequest);
            
            user = new ApplicationUser(request.Email, request.Email, request.FirstName, request.LastName);
            var result = await _userManager.CreateAsync(user, request.Password).ConfigureAwait(false);
                return result.Succeeded ? result : throw new ApiException(result);
        }
    }
}
