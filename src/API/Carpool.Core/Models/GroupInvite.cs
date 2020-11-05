using System;
using System.ComponentModel.DataAnnotations.Schema;
using Carpool.Core.Abstract;

namespace Carpool.Core.Models
{
	public class GroupInvite : BaseEntity<Guid>
	{
        public bool IsAccepted { get; set; }

		public bool IsPending { get; set; }

		public Guid GroupId { get; set; }

		//public Group Group { get; set; }
		
		public Guid InvitedUserId { get; set; }
        public virtual User InvitedUser { get; set; }

		public Guid InvitingUserId { get; set; }
        public virtual User InvitingUser { get; set; }

		public DateTime DateAdded { get; set; }
	}
}