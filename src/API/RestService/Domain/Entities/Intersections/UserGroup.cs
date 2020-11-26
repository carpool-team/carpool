using System;
using IdentifiersShared.Identifiers;

namespace Domain.Entities.Intersections
{
	public class UserGroup
	{
		public UserGroup(UserId userId, GroupId groupId)
		{
			UserId = userId;
			GroupId = groupId;
		}

		public UserId UserId { get; set; }
		public ApplicationUser ApplicationUser { get; set; }
		public GroupId GroupId { get; set; }
		public Group Group { get; set; }
	}
}