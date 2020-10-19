using System;
using System.ComponentModel.DataAnnotations.Schema;
using Carpool.Core.Abstract;

namespace Carpool.Core.Models
{
	public class GroupInvite : BaseEntity<Guid>
	{
		public bool IsPending { get; set; }
		public Guid GroupId { get; set; }
		//public Group Group { get; set; }
		[ForeignKey("InvitedUserId")]
		public Guid InvitedUserId { get; set; }
		[ForeignKey("InviterId")]
		public Guid InviterId { get; set; }

		public bool IsAccepted { get; set; }

		public DateTime DateAdded { get; set; }
	}
}