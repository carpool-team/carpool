using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.GroupInvite;
using MediatR;

namespace Carpool.RestAPI.Commands.GroupInvite
{
	public class DeleteGroupInviteCommandHandler : IRequestHandler<DeleteGroupInviteCommand, Core.Models.GroupInvite>
	{
		private readonly IGroupInviteRepository _repository;
		
		public async Task<Core.Models.GroupInvite> Handle(DeleteGroupInviteCommand request,
		                                            CancellationToken cancellationToken)
		{
			var groupInvite = await _repository.GetByIdAsync(request.GroupInviteId, cancellationToken).ConfigureAwait(false);
			if (groupInvite == null) throw new NullReferenceException(nameof(groupInvite));

			_repository.Delete(groupInvite);
			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			return groupInvite;
		}
	}
}