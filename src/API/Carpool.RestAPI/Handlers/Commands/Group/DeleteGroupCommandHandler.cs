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
    public class DeleteGroupCommandHandler : AsyncRequestHandler<DeleteGroupCommand>
    {
        private readonly IGroupRepository _repository;

        public DeleteGroupCommandHandler(IGroupRepository repository)
        {
            _repository = repository;
        }

        protected override async Task Handle(DeleteGroupCommand request, CancellationToken cancellationToken)
        {
            var group = await _repository.GetByIdAsync(request.Id);
            _repository.Delete(group);
            await _repository.SaveAsync(cancellationToken);
        }
    }
}
