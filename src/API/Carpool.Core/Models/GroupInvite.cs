using System;
using Carpool.Core.Abstract;

namespace Carpool.Core.Models
{
	public class GroupInvite : BaseEntity<Guid>
	{
		public bool IsPending { get; set; }

		public Guid GroupId { get; set; }
		public Group Group { get; set; }

		public Guid InvitedUserId { get; set; }

		public User InvitedUser { get; set; }

		public User Inviter { get; set; }
		public Guid InviterId { get; set; }

		public bool IsAccepted { get; set; }

		public DateTime DateAdded { get; set; }
	}
}