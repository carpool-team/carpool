using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Group;
using MediatR;

namespace Carpool.RestAPI.Commands.Group
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
            var group = await _repository.GetByIdAsync(request.Id, cancellationToken).ConfigureAwait(false);
            group.LocationId = request.LocationId;
            group.Name = request.Name;
            group.Code = request.Code;
            group.OwnerId = request.OwnerId;
            await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
        }
    }
}
