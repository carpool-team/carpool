using System;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.DAL.Repositories.GroupInvite;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.RestAPI.Commands.GroupInvite
{
	public class DeleteGroupInviteCommandHandler : IRequestHandler<DeleteGroupInviteCommand, Guid>
	{
		private readonly IGroupInviteRepository _repository;

		public async Task<Guid> Handle(DeleteGroupInviteCommand request,
		                                                  CancellationToken cancellationToken)
		{
			var groupInvite = await _repository.GetByIdAsync(request.GroupInviteId, cancellationToken)
			                                   .ConfigureAwait(false);

			if (groupInvite == null) throw new ApiException($"Group Invite with id:{request.GroupInviteId} does not exist", StatusCodes.Status404NotFound);

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