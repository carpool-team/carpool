using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.DatabaseContexts;
using Carpool.DAL.Repositories.Group;
using MediatR;

namespace Carpool.RestAPI.Commands.Group
{
    public class AddGroupCommandHandler : AsyncRequestHandler<AddGroupCommand>
    {
        private readonly IGroupRepository _repository;

        public AddGroupCommandHandler(IGroupRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(_repository)); ;
        }

        protected override async Task Handle(AddGroupCommand request, CancellationToken cancellationToken)
        {
            var group = new Core.Models.Group();
            group.Name = request.Name;
            group.Code = request.Code;

            await _repository.AddAsync(group, cancellationToken);
            await _repository.SaveAsync(cancellationToken);
        }
    }
}
