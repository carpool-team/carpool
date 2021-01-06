using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using Domain.Abstract;
using Domain.Entities.Intersections;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;

namespace Domain.Entities
{
	public class Group : BaseEntity<GroupId>
	{
		public static Group CreateGroupWithOwner(GroupId groupId,
		                                  string name, 
		                                  string code,
		                                  AppUserId ownerId, 
		                                  Location location)
		{
			var group = new Group()
			{
				Id = groupId,
				Name = name,
				Code = code,
				Location = location,
				OwnerId = ownerId,
				UserGroups = new List<UserGroup>() {new(ownerId, groupId)}
			};

			return group;
		}

		public List<UserGroup> UserGroups { get; private set; }
	
		public Location Location { get; set; }

		public IReadOnlyList<Ride> Rides { get; set; }

		public string Name { get; set; }

		public string Code { get; set; }
		public ApplicationUser Owner { get; set; }
		
		public AppUserId OwnerId { get; set; }

		public async Task<bool> RemoveUserFromGroup(AppUserId appUserId, CancellationToken cancellationToken = default)
		{
			var userGroup = UserGroups.SingleOrDefault(x => x.AppUserId == appUserId);

			if (userGroup == null)
				return false;
			
			UserGroups.Remove(userGroup);

			return true;
		}
	}
}