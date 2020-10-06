using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Group;
using MediatR;

namespace Carpool.RestAPI.Commands.Group
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
            var group = await _repository.GetByIdAsync(request.Id, cancellationToken).ConfigureAwait(false);
            _repository.Delete(group);
            await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
        }
    }
}
