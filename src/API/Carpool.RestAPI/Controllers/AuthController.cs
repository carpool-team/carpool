using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.RestAPI.Commands.Auth;
using MediatR;

namespace Carpool.RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
            => _mediator = mediator;

        [HttpPost("register")]
        public async Task<ApiResponse> Register([FromBody] RegisterUser request)
        {
            if (!ModelState.IsValid)
                throw new ApiProblemDetailsException(ModelState);
            var response = await _mediator.Send(request).ConfigureAwait(false);
            return new ApiResponse(response);
        }
    }
}
