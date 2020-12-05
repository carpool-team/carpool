using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories;
using Domain.Contracts;
using Domain.Contracts.Repositories;
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
		private readonly IGroupInviteRepository _groupInviteRepository;
		private readonly IUnitOfWork _unitOfWork;

		public UpdateGroupInviteCommandHandler(IGroupInviteRepository grouInviteRepository, IGroupRepository groupRepository, IUnitOfWork unitOfWork)
			=> (_groupInviteRepository, _groupRepository, _unitOfWork)
				= (grouInviteRepository, groupRepository, unitOfWork);
		protected override async Task Handle(UpdateGroupInviteCommand request, CancellationToken cancellationToken)
		{
			var groupInvite = await _groupInviteRepository.GetByIdAsync((GroupInviteId) request.GroupInviteId, cancellationToken)
				.ConfigureAwait(false);

			groupInvite.IsPending = false;
			groupInvite.IsAccepted = request.IsAccepted;

			if (groupInvite.IsAccepted)
			{
				var userGroup = new UserGroup(groupInvite.InvitedAppUserId, groupInvite.GroupId);

				await _groupRepository.AddUserToGroupAsync(userGroup,
						cancellationToken);
			}

			await _unitOfWork.SaveAsync(cancellationToken).ConfigureAwait(false);
		}
	}
}