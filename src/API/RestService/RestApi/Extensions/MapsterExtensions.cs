using DataTransferObjects.GroupDtos;
using DataTransferObjects.RideRequest;
using Domain.Entities;
using Mapster;
using RestApi.DTOs.Ride;
using RestApi.DTOs.Stop;

namespace RestApi.Extensions
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