using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.Core.Models.Intersections;
using Carpool.DAL.Repositories.GroupInvite;
using MediatR;

namespace Carpool.RestAPI.Commands.GroupInvite
{
	public class UpdateGroupInviteCommandHandler : AsyncRequestHandler<UpdateGroupInviteCommand>
	{
		private readonly IGroupInviteRepository _repository;

		public UpdateGroupInviteCommandHandler(IGroupInviteRepository repository)
			=> _repository = repository;

		protected override async Task Handle(UpdateGroupInviteCommand request, CancellationToken cancellationToken)
		{
			var groupInvite = await _repository.GetByIdAsync((Guid) request.GroupInviteId, cancellationToken)
			                                   .ConfigureAwait(false);
			// _ = await _context.GroupInvites.Include(x => x.InvitedUser)
			//                                .ThenInclude(user => user.UserGroups)
			//                                .Include(groupInvite => groupInvite.Group).FirstOrDefaultAsync(groupInvite
			//                                 => groupInvite.Id == changeGroupInviteDto.GroupInviteId).ConfigureAwait(false);

			groupInvite.IsPending = false;
			groupInvite.IsAccepted = request.IsAccepted;

			if (groupInvite.IsAccepted)
			{
				var userGroup = new UserGroup
				{
					Group = groupInvite.Group,
					User = groupInvite.InvitedUser
				};

				groupInvite.InvitedUser.UserGroups.Add(userGroup);
			}

			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
		}
	}
}