using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Group;
using Carpool.RestAPI.Commands.Group;
using Carpool.RestAPI.Queries.Group;
using MediatR;

namespace Carpool.RestAPI.Handlers.Queries.Group
{
    public class GetGroupQueryHandler : IRequestHandler<GetGroupQuery, Core.Models.Group>
    {
        private readonly IGroupRepository _repository;

        public GetGroupQueryHandler(IGroupRepository repository)
        {
            _repository = repository;
        }


        public async Task<Core.Models.Group> Handle(GetGroupQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetByIdAsNoTrackingAsync(request.Id);
        }
    }
}
