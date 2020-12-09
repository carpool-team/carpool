using Domain.ValueObjects;
using IdentifiersShared.Identifiers;

namespace DataTransferObjects.GroupDtos
{
    public class IndexGroupDTO
    {
        public IndexGroupDTO(GroupId id, Location location, string name, int rideCount, int userCount) : this(id, name,
            rideCount, userCount)
            => Location = new(location.Longitude, location.Latitude);

        public IndexGroupDTO(GroupId id, string name, int rideCount, int userCount) : this()
        {
            Id = id;
            Name = name;
            RideCount = rideCount;
            UserCount = userCount;
        }

        public IndexGroupDTO() { }

        public int UserCount { get; }

        public GroupId Id { get; set; }

        public LocationDto Location { get; set; }

        public string Name { get; set; }

        public int RideCount { get; set; }
    }
}