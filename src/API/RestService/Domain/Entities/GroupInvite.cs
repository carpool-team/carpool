﻿using System;
using Domain.Abstract;
using Domain.Contracts;
using IdentifiersShared.Identifiers;

namespace Domain.Entities
{
	public class GroupInvite : BaseEntity<GroupInviteId>, ISoftDeletable
	{
		public bool IsAccepted { get; set; }

		public bool IsPending { get; set; }

		public GroupId GroupId { get; set; }

		public Group Group { get; set; }

		public AppUserId InvitedAppUserId { get; set; }
		public virtual ApplicationUser InvitedApplicationUser { get; set; }

		public AppUserId InvitingAppUserId { get; set; }
		public virtual ApplicationUser InvitingApplicationUser { get; set; }

		public DateTimeOffset DateAdded { get; set; }
		
		public bool IsSoftDeleted { get; set; }
	}
}