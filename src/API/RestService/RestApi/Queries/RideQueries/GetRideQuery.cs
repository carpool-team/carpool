using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataTransferObjects;
using DataTransferObjects.GroupDtos;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;
using RestApi.DTOs.Ride;
using RestApi.DTOs.Stop;
using RestApi.DTOs.User;

namespace RestApi.Queries.RideQueries
{
	public class GetRideQuery : IRequest<RideDto>
	{
		[JsonConstructor]
		public GetRideQuery(RideId rideId)
			=> RideId = rideId;

		public RideId RideId { get; }
	}
	
	public class GetRideQueryHandler : IRequestHandler<GetRideQuery, RideDto>
	{
		private readonly IRideRepository _repository;

		public GetRideQueryHandler(IRideRepository repository)
			=> _repository = repository;

		public async Task<RideDto> Handle(GetRideQuery request, CancellationToken cancellationToken)
		{
			var ride = await _repository.GetByIdAsync(request.RideId, cancellationToken).ConfigureAwait(false);
			_ = ride ?? throw new NullReferenceException(nameof(ride));
			
			var owner = ride.Owner;
			RideOwnerDto rideOwnerDto = new(owner.Rating, owner.FirstName, owner.LastName, owner.Id);

			var group = ride.Group;
			GroupDto groupDto = new(group.UserGroups.Count,
				group.Id,
				new LocationDto(group.Location.Longitude, group.Location.Latitude),
				group.Name);

			List<StopDto> stopDtos =
				ride.Stops.Select(x => new StopDto(new LocationDto(x.Location.Longitude, x.Location.Latitude),
					    new ParticipantDto(x.Participant.Id, x.Participant.FirstName, x.Participant.LastName)))
				    .ToList();
			
			RideDto rideDto = new RideDto(rideOwnerDto, groupDto,
				new LocationDto(ride.Location.Longitude, ride.Location.Latitude), ride.Price,
				ride.RideDirection, stopDtos, ride.Date, ride.Id, ride.SeatsLimit);
			
			return rideDto;
		}
	}
}