using System;
using Domain.Abstract;

namespace Domain.Entities
{
	public class GroupInvite : BaseEntity<Guid>
	{
		public bool IsAccepted { get; set; }

		public bool IsPending { get; set; }

		public Guid GroupId { get; set; }

		//public Group Group { get; set; }

		public Guid InvitedUserId { get; set; }
		public virtual ApplicationUser InvitedApplicationUser { get; set; }

		public Guid InvitingUserId { get; set; }
		public virtual ApplicationUser InvitingApplicationUser { get; set; }

		public DateTime DateAdded { get; set; }
	}
}