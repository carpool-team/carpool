using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.Group;
using DataAccessLayer.Repositories.GroupInvite;
using Domain.Entities.Intersections;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupInviteCommands
{
	public class UpdateGroupInviteCommand : IRequest
	{
		[JsonConstructor]
		public UpdateGroupInviteCommand(GroupInviteId groupInviteId, bool isAccepted)
		{
			GroupInviteId = groupInviteId;
			IsAccepted = isAccepted;
		}

		public GroupInviteId GroupInviteId { get; set; }

		public bool IsAccepted { get; set; }
	}
	
	public class UpdateGroupInviteCommandHandler : AsyncRequestHandler<UpdateGroupInviteCommand>
	{
		private readonly IGroupRepository _groupRepository;
		private readonly IGroupInviteRepository _repository;

		public UpdateGroupInviteCommandHandler(IGroupInviteRepository repository, IGroupRepository groupRepository)
		{
			_repository = repository;
			_groupRepository = groupRepository;
		}

		protected override async Task Handle(UpdateGroupInviteCommand request, CancellationToken cancellationToken)
		{
			var groupInvite = await _repository.GetByIdAsync((GroupInviteId) request.GroupInviteId, cancellationToken)
				.ConfigureAwait(false);
			// _ = await _context.GroupInvites.Include(x => x.InvitedApplicationUser)
			//                                .ThenInclude(user => user.UserGroups)
			//                                .Include(groupInvite => groupInvite.Group).FirstOrDefaultAsync(groupInvite
			//                                 => groupInvite.RideId == changeGroupInviteDto.GroupInviteId).ConfigureAwait(false);

			groupInvite.IsPending = false;
			groupInvite.IsAccepted = request.IsAccepted;

			if (groupInvite.IsAccepted)
			{
				var userGroup = new UserGroup(groupInvite.InvitedAppUserId, groupInvite.GroupId);

				await _groupRepository.AddUserToGroupAsync(userGroup,
						cancellationToken)
					.ConfigureAwait(false);
			}

			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
		}
	}
}