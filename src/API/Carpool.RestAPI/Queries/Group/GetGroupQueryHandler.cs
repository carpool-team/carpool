using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Group;
using Carpool.RestAPI.DTOs.GroupDTOs;
using Carpool.RestAPI.DTOs.RideDTOs;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Carpool.RestAPI.Queries.Group
{
	public class GetGroupQueryHandler : IRequestHandler<GetGroupQuery, GroupDetailsDto>
	{
		private readonly IHttpContextAccessor _httpContextAccessor;
		private readonly IGroupRepository _repository;
		private readonly UserManager<Core.Models.User> _userManager;

		public GetGroupQueryHandler(IGroupRepository repository,
		                            IHttpContextAccessor httpContextAccessor,
		                            UserManager<Core.Models.User> userManager)
		{
			_repository = repository;
			_httpContextAccessor = httpContextAccessor;
			_userManager = userManager;
		}


		public async Task<GroupDetailsDto> Handle(GetGroupQuery request, CancellationToken cancellationToken)
		{
			var group = await _repository.GetByIdAsNoTrackingAsync(request.Id, cancellationToken).ConfigureAwait(false);
			var userClaimsPrincipal = _httpContextAccessor.HttpContext.User;
			var userId = _userManager.GetUserId(userClaimsPrincipal);
			var rideDtos = group.Rides
			                    .Select(x
				                    => new RideMinimalDto(x.Id, x.OwnerId != Guid.Parse(userId), x.Date, x.Destination))
			                    .ToList();

			var groupDto = new GroupDetailsDto(
				group.Id,
				group.Location,
				rideDtos, group.Name, group.Code, group.Owner
			);

			return groupDto;
		}
	}
}