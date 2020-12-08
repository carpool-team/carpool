using System;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupInviteCommands
{
	public class DeleteGroupInviteCommand : IRequest<GroupInviteId>
	{
		[JsonConstructor]
		public DeleteGroupInviteCommand(GroupInviteId groupInviteId)
			=> GroupInviteId = groupInviteId;

		public GroupInviteId GroupInviteId { get; }
	}
	
	public class DeleteGroupInviteCommandHandler : IRequestHandler<DeleteGroupInviteCommand, GroupInviteId>
	{
		private readonly IGroupInviteRepository _groupInviteRepository;
		private readonly IUnitOfWork _unitOfWork;


		public DeleteGroupInviteCommandHandler(IGroupInviteRepository groupInviteRepository, IUnitOfWork unitOfWork)
			=> (_groupInviteRepository, _unitOfWork)
				= (groupInviteRepository, unitOfWork);

		public async Task<GroupInviteId> Handle(DeleteGroupInviteCommand request,
			CancellationToken cancellationToken)
		{
			var groupInvite = await _groupInviteRepository.GetByIdAsync(request.GroupInviteId, cancellationToken)
				.ConfigureAwait(false);

			if (groupInvite == null)
				throw new ApiException($"Group Invite with id:{request.GroupInviteId} does not exist",
					StatusCodes.Status404NotFound);

			_groupInviteRepository.Delete(groupInvite);
			try
			{
				await _unitOfWork.SaveAsync(cancellationToken).ConfigureAwait(false);
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