﻿using System;
using IdentifiersShared.Identifiers;

namespace DataTransferObjects.GroupInvites
{
    public class IndexGroupInviteDTO
    {
        public IndexGroupInviteDTO(GroupInviteId id,
            bool isPending,
            bool isAccepted,
            GroupId groupId,
            string groupName,
            AppUserId invitedAppUserId,
            DateTimeOffset dateAdded)
        {
            Id = id;
            IsPending = isPending;
            IsAccepted = isAccepted;
            GroupId = groupId;
            GroupName = groupName;
            InvitedAppUserId = invitedAppUserId;
            DateAdded = dateAdded;
        }

        public GroupInviteId Id { get; set; }

        public bool IsPending { get; set; }
        public bool IsAccepted { get; set; }

        public GroupId GroupId { get; set; }
        public string GroupName { get; set; }

        public AppUserId InvitedAppUserId { get; set; }

        public DateTimeOffset DateAdded { get; set; }
    }
}