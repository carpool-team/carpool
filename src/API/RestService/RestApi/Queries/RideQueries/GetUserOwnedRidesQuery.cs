using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataTransferObjects;
using DataTransferObjects.GroupDtos;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;
using RestApi.DTOs.Ride;
using RestApi.DTOs.Stop;
using RestApi.DTOs.User;
using RestApi.DTOs.Vehicle;

namespace RestApi.Queries.RideQueries
{
	public class GetUserOwnedRidesQuery : IRequest<IEnumerable<RideDto>>
	{
		public GetUserOwnedRidesQuery(AppUserId appUserId, bool past)
		{
			AppUserId = appUserId;
			Past = past;
		}

		public AppUserId AppUserId { get; }
		public bool Past { get; }
	}

	public class GetUserOwnedRidesQueryHandler
		: IRequestHandler<GetUserOwnedRidesQuery, IEnumerable<RideDto>>
	{
		private readonly IRideRepository _repository;

		public GetUserOwnedRidesQueryHandler(IRideRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<RideDto>> Handle(GetUserOwnedRidesQuery request,
			CancellationToken cancellationToken)
		{
			try
			{
				var rides = await _repository
					.GetOwnedRidesByUserIdAsNoTrackingAsync(request.AppUserId, request.Past, cancellationToken)
					.ConfigureAwait(false);
				List<RideDto> rideDtos = new();
				foreach (var ride in rides)
				{
					var owner = ride.Owner;
					IndexVehicleDto? vehicleDto = owner.Vehicle != null ? new(owner.Vehicle.Name) : (IndexVehicleDto?)null;
					OwnerDto ownerDto = new(owner.Rating, owner.FirstName, owner.LastName, owner.Id, vehicleDto);

					var group = ride.Group;
					GroupDto groupDto = new(group.UserGroups.Count,
						group.Id,
						new LocationDto(group.Location.Longitude, group.Location.Latitude),
						group.Name);

					List<StopDto> stopDtos =
						ride.Stops.Select(x => new StopDto(new LocationDto(x.Location.Longitude, x.Location.Latitude)))
							.ToList();
					rideDtos.Add(new RideDto(ownerDto, groupDto,
						new LocationDto(ride.Location.Longitude, ride.Location.Latitude), ride.Price,
						ride.RideDirection, stopDtos, ride.Date, ride.Id, ride.SeatsLimit));
				}

				return rideDtos;
			}
			catch (Exception ex)
			{
				throw new ApiException(ex.InnerException);
			}
		}
	}
}