using Carpool.Core.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.Models
{
	public class GroupInvite : ParentModel
	{
		public bool IsPending { get; set; }

		public Group Group { get; set; }

		public Guid InvitedUserId { get; set; }

		public User InvitedUser { get; set; }

		public bool IsAccepted { get; set; }

		public DateTime DateAdded { get; set; }
	}
}