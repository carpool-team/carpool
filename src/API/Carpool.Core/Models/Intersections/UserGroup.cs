using System;
using System.Security.AccessControl;

namespace Carpool.Core.Models.Intersections
{
	public class UserGroup
	{
		public UserGroup(Guid userId, Guid groupId)
		{
			UserId = userId;
			GroupId = groupId;
		}

		public Guid UserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public Guid GroupId { get; set; }
		public Group Group { get; set; }
	}
}