using System;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.GroupInvite;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupInviteCommands
{
	public class AddGroupInviteCommand : IRequest<GroupInviteId>
	{
		[JsonConstructor]
		public AddGroupInviteCommand(GroupId groupId, UserId invitedUserId, UserId inviterId)
		{
			GroupId = groupId;
			InvitedUserId = invitedUserId;
			InviterId = inviterId;
		}

		public GroupId GroupId { get; set; }

		public UserId InvitedUserId { get; set; }

		public UserId InviterId { get; set; }
	}
	
	public class AddGroupInviteCommandHandler : IRequestHandler<AddGroupInviteCommand, GroupInviteId>
	{
		private readonly IGroupInviteRepository _repository;

		public AddGroupInviteCommandHandler(IGroupInviteRepository repository)
			=> _repository = repository;

		public async Task<GroupInviteId> Handle(AddGroupInviteCommand request,
			CancellationToken cancellationToken)
		{
			var groupInvite = new GroupInvite
			{
				InvitingUserId = request.InviterId,
				InvitedUserId = request.InvitedUserId,
				IsAccepted = false,
				DateAdded = DateTime.Now,
				GroupId = request.GroupId
			};

			await _repository.AddAsync(groupInvite, cancellationToken).ConfigureAwait(false);
			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);

			return groupInvite.Id;
		}
	}
}