using System;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.GroupInvite;
using Domain.Entities;
using MediatR;

namespace RestApi.Commands.GroupInviteCommands
{
	public class AddGroupInviteCommandHandler : IRequestHandler<AddGroupInviteCommand, Guid>
	{
		private readonly IGroupInviteRepository _repository;

		public AddGroupInviteCommandHandler(IGroupInviteRepository repository)
			=> _repository = repository;

		public async Task<Guid> Handle(AddGroupInviteCommand request,
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