using Domain.Entities;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;
using RestApi.DTOs.Ride;
using RestApi.DTOs.User;
using System.Collections.Generic;

namespace DataTransferObjects.GroupDtos
{
    public class GroupDetailsDto
    {
        public GroupDetailsDto(GroupId groupId,
            Location location,
            List<RideMinimalDto> rides,
            string name,
            string code,
            ApplicationUser owner,
            int userCount,
            int rideCount)
        {
            GroupId = groupId;
            Location = new LocationDto(location.Longitude, location.Latitude);
            Rides = rides;
            Name = name;
            Code = code;
            UserCount = userCount;
            RideCount = rideCount;
            Owner = new IndexUserDto(owner.Id, owner.FirstName, owner.LastName, owner.Vehicle);
        }

        public GroupId GroupId { get; }
        public LocationDto? Location { get; }
        public List<RideMinimalDto> Rides { get; }
        public string Name { get; }
        public string Code { get; }
        public IndexUserDto Owner { get; }
        public int UserCount { get; }
        public int RideCount { get; }
    }
}