using System;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.Repositories.GroupInvite;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RestApi.Commands.GroupInviteCommands
{
	public class DeleteGroupInviteCommandHandler : IRequestHandler<DeleteGroupInviteCommand, GroupInviteId>
	{
		private readonly IGroupInviteRepository _repository;

		public DeleteGroupInviteCommandHandler(IGroupInviteRepository repository)
			=> _repository = repository;

		public async Task<GroupInviteId> Handle(DeleteGroupInviteCommand request,
			CancellationToken cancellationToken)
		{
			var groupInvite = await _repository.GetByIdAsync(request.GroupInviteId, cancellationToken)
				.ConfigureAwait(false);

			if (groupInvite == null)
				throw new ApiException($"Group Invite with id:{request.GroupInviteId} does not exist",
					StatusCodes.Status404NotFound);

			_repository.Delete(groupInvite);
			try
			{
				await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
				return groupInvite.Id;
			}
			catch (Exception ex)
			{
				var details = new ProblemDetails();
				details.Title = $"Group Invite with id: {request.GroupInviteId} could not be deleted";
				details.Status = StatusCodes.Status500InternalServerError;
				details.Detail = ex.ToString();
				throw new ApiProblemDetailsException(details);
			}
		}
	}
}