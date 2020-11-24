using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.Repositories.Group;
using Domain.ValueObjects;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace RestApi.Commands.GroupCommands
{
	public class ChangeGroupLocationCommandHandler : AsyncRequestHandler<ChangeGroupLocationCommand>
	{
		private readonly IGroupRepository _repository;

		public ChangeGroupLocationCommandHandler(IGroupRepository repository)
			=> _repository = repository;

		protected override async Task Handle(ChangeGroupLocationCommand request, CancellationToken cancellationToken)
		{
			var group = await _repository.GetByIdAsync(request.GroupId, cancellationToken).ConfigureAwait(false);
			_ = group ?? throw new ApiProblemDetailsException($"Group with id: {request.GroupId} does not exist.",
				    StatusCodes.Status404NotFound);

			group.Location = new Location(request.Longitude, request.Latitude);
			try
			{
				await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}