using DataTransferObjects.Group;
using DataTransferObjects.Ride;
using DataTransferObjects.RideRequest;
using Domain.Entities;
using Mapster;

namespace Application.Extensions
{
	public static class MapsterExtensions
	{
		public static void RegisterCustomMappings()
		{
			TypeAdapterConfig<Group, GroupDto>
				.NewConfig()
				.Map(group => group.GroupId,
					src => src.Id);
			
			TypeAdapterConfig<Group, GroupDetailsDto>
				.NewConfig()
				.Map(group => group.GroupId,
					src => src.Id);

			TypeAdapterConfig<Ride, RideDto>
				.NewConfig()
				.Map(ride => ride.RideId,
					src => src.Id);
			
			TypeAdapterConfig<RideRequest, RideRequestDto>
				.NewConfig()
				.Map(ride => ride.RideRequestId,
					src => src.Id);
						
			TypeAdapterConfig<RideRequest, UpdateRideRequestDto>
				.NewConfig()
				.Map(ride => ride.RideRequestId,
					src => src.Id);
		}
	}
}