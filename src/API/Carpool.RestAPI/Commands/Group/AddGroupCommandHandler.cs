using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.DAL.Repositories.Group;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.RestAPI.Commands.Group
{
	public class AddGroupCommandHandler : IRequestHandler<AddGroupCommand, Guid>
	{
		private readonly IGroupRepository _repository;

		public AddGroupCommandHandler(IGroupRepository repository)
			=> _repository = repository ?? throw new ArgumentNullException(nameof(repository));

        public async Task<Guid> Handle(AddGroupCommand request, CancellationToken cancellationToken)
        {
            if (!string.IsNullOrEmpty(request.Code)
                && await _repository.GroupCodeExists(request.Code).ConfigureAwait(false))
                throw new ApiException($"Group code {request.Code} already exists", StatusCodes.Status409Conflict);

            
            
            var group = new Core.Models.Group()
            {
                Name = request.Name,
                Code = request.Code,
                OwnerId = request.OwnerId
            };

            group.Location = request.Longitude is null || request.Latitude is null ?
                                 null :
                                 new Core.Models.Location()
                                     {Latitude = (double) request.Latitude, Longitude = (double) request.Longitude};
            
            try
            {
                await _repository.AddAsync(group, cancellationToken).ConfigureAwait(false);
                await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                throw new ApiException(ex);
            }

            return group.Id;
        }
    }
}