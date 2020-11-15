using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Group;
using Carpool.RestAPI.DTOs.Group;
using Carpool.RestAPI.DTOs.Ride;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Carpool.RestAPI.Queries.Group
{
	public class GetGroupQueryHandler : IRequestHandler<GetGroupQuery, GroupDetailsDto>
	{
		private readonly IHttpContextAccessor _httpContextAccessor;
		private readonly IGroupRepository _repository;
		private readonly UserManager<Core.Models.ApplicationUser> _userManager;

		public GetGroupQueryHandler(IGroupRepository repository,
		                            IHttpContextAccessor httpContextAccessor,
		                            UserManager<Core.Models.ApplicationUser> userManager)
		{
			_repository = repository;
			_httpContextAccessor = httpContextAccessor;
			_userManager = userManager;
		}


		public async Task<GroupDetailsDto> Handle(GetGroupQuery request, CancellationToken cancellationToken)
		{
			var group = await _repository.GetByIdAsNoTrackingAsync(request.Id, cancellationToken).ConfigureAwait(false);

			var groupDto = new GroupDetailsDto(
				group.Id,
				group.Location,
				group.Rides.Select(x => new RideMinimalDto(x.Id, x.Date, x.Destination )).ToList(), 
				group.Name, 
				group.Code, 
				group.Owner,
				group.UserGroups.Count,
				group.Rides.Count
			);

			return groupDto;
		}
	}
}