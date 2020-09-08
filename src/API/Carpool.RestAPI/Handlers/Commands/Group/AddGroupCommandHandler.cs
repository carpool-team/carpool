using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Group;
using Carpool.RestAPI.Commands.Group;
using MediatR;

namespace Carpool.RestAPI.Handlers.Commands.Group
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
            if (request.Code != "" && await _repository.GroupCodeExists(request.Code)) throw new InvalidOperationException("Group code already exists");

            var group = new Core.Models.Group();
            group.Name = request.Name;
            group.Code = request.Code;
            group.OwnerId = request.OwnerId;

            await _repository.AddAsync(group, cancellationToken);
            await _repository.SaveAsync(cancellationToken);
        }
    }
}
