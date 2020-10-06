using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Group;
using MediatR;

namespace Carpool.RestAPI.Commands.Group
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
            var group = await _repository.GetByIdAsync(request.GroupId, cancellationToken).ConfigureAwait(false);
            group.LocationId = request.LocationId;
            await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
        }
    }
}
