using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Group;
using Carpool.RestAPI.Commands.Group;
using MediatR;

namespace Carpool.RestAPI.Handlers.Commands.Group
{
    public class UpdateGroupCommandHandler : AsyncRequestHandler<UpdateGroupCommand>
    {
        private readonly IGroupRepository _repository;

        public UpdateGroupCommandHandler(IGroupRepository repository)
        {
            _repository = repository;
        }

        protected override async Task Handle(UpdateGroupCommand request, CancellationToken cancellationToken)
        {
            var group = await _repository.GetByIdAsync(request.Id);
            group.LocationId = request.LocationId;
            group.Name = request.Name;
            group.Code = request.Code;
            group.OwnerId = request.OwnerId;
            await _repository.SaveAsync(cancellationToken);
        }
    }
}
