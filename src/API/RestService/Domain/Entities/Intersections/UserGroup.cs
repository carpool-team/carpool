using Domain.Contracts;
using IdentifiersShared.Identifiers;

namespace Domain.Entities.Intersections
{
	public class UserGroup : ISoftDeletable
	{
		public UserGroup(AppUserId appUserId, GroupId groupId)
		{
			AppUserId = appUserId;
			GroupId = groupId;
		}

		public AppUserId AppUserId { get; set; }
		public ApplicationUser ApplicationUser { get; set; }
		public GroupId GroupId { get; set; }
		public Group Group { get; set; }
		
		public bool IsSoftDeleted { get; set; }
	}
}