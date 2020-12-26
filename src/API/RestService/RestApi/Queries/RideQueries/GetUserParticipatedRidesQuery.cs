using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataTransferObjects;
using DataTransferObjects.GroupDtos;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;
using RestApi.DTOs.Ride;
using RestApi.DTOs.Stop;
using RestApi.DTOs.User;

namespace RestApi.Queries.RideQueries
{
	public class GetUserParticipatedRidesQuery : IRequest<IEnumerable<RideDto>>
	{
		public GetUserParticipatedRidesQuery(AppUserId appUserId, bool past)
		{
			AppUserId = appUserId;
			Past = past;
		}

		public AppUserId AppUserId { get; }
		public bool Past { get; }
	}

	public class GetUserParticipatedRidesQueryHandler 
		: IRequestHandler<GetUserParticipatedRidesQuery, IEnumerable<RideDto>>
	{
		private readonly IRideRepository _repository;

		public GetUserParticipatedRidesQueryHandler(IRideRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<RideDto>> Handle(GetUserParticipatedRidesQuery request,
			CancellationToken cancellationToken)
		{
			var userRides = await _repository.GetParticipatedRidesByUserIdAsNoTrackingAsync(request.AppUserId,
					request.Past,
					cancellationToken)
				.ConfigureAwait(false);
			
			List<RideDto> rideDtos = new();
			
			foreach (var ride in userRides)
			{
				var owner = ride.Owner;
				RideOwnerDto rideOwnerDto = new(owner.Rating, owner.FirstName, owner.LastName, owner.Id);

				var group = ride.Group;
				GroupDto groupDto = new(group.UserGroups.Count,
					group.Id,
					new LocationDto(group.Location.Longitude, group.Location.Latitude),
					group.Name);

				List<StopDto> stopDtos = ride.Stops
					.Select(x => new StopDto(new LocationDto(x.Location.Longitude, x.Location.Latitude), 
						new ParticipantDto(x.ParticipantId, x.Participant.FirstName, x.Participant.LastName)))
						.ToList();
				
				rideDtos.Add(new RideDto(rideOwnerDto, groupDto,
					new LocationDto(ride.Location.Longitude, ride.Location.Latitude), ride.Price,
					ride.RideDirection, stopDtos, ride.Date, ride.Id, ride.SeatsLimit));
			}

			return rideDtos;
		}
	}
}