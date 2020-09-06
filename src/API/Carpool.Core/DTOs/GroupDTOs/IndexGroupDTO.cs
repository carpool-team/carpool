using Carpool.Core.Models;
using System;
using System.Linq;

namespace Carpool.Core.DTOs.GroupDTOs
{
    public class IndexGroupDTO
	{
        public Guid Id { get; set; }

		public Location Location { get; set; }

		public string Name { get; set; }

		public int RideCount { get; set; }

		public int UserCount { get; set; }

		public static IndexGroupDTO FromGroup(Group group)
        {
            _ = group?.Location?.Coordinates ?? throw new InvalidOperationException("Location cannot be null");
			return new IndexGroupDTO()
			{
				Id = group.Id,
				Location = group.Location,
				Name = group.Name,
                RideCount = group.Rides?.Count() ?? 0,
                UserCount = group.UserGroups?.Count() ?? 0
		};
		}
	}
}