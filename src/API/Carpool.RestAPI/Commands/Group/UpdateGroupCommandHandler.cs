using System;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.DAL.Repositories.Group;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Carpool.RestAPI.Commands.Group
{
	public class UpdateGroupCommandHandler : IRequestHandler<UpdateGroupCommand, Guid>
	{
		private readonly IGroupRepository _repository;

		public UpdateGroupCommandHandler(IGroupRepository repository)
			=> _repository = repository;


		public async Task<Guid> Handle(UpdateGroupCommand request, CancellationToken cancellationToken = default)
		{
			var group = await _repository.GetByIdAsync(request.Id, cancellationToken).ConfigureAwait(false);
			_ = group ?? throw new ApiProblemDetailsException($"Group with id: {request.Id} does not exist.",
				    StatusCodes.Status400BadRequest);

			group.Location = request.Location ?? group.Location;
			group.Name = request.Name ?? group.Name;
			group.Code = request.Code ?? group.Code;
			group.OwnerId = request.OwnerId ?? group.OwnerId;

			try
			{
				await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}
			
			return group.Id;
		}
	}
}