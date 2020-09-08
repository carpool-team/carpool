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
    public class ChangeGroupLocationCommandHandler : AsyncRequestHandler<ChangeGroupLocationCommand>
    {
        private readonly IGroupRepository _repository;

        public ChangeGroupLocationCommandHandler(IGroupRepository repository)
        {
            _repository = repository;
        }

        protected override async Task Handle(ChangeGroupLocationCommand request, CancellationToken cancellationToken)
        {
            var group = await _repository.GetByIdAsync(request.GroupId);
            group.LocationId = request.LocationId;
            await _repository.SaveAsync(cancellationToken);
        }
    }
}
