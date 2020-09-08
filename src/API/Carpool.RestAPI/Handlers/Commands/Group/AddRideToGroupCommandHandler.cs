using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Group;
using Carpool.DAL.Repositories.Ride;
using Carpool.RestAPI.Commands.Group;
using MediatR;

namespace Carpool.RestAPI.Handlers.Commands.Group
{
    public class AddRideToGroupCommandHandler : AsyncRequestHandler<AddRideToGroupCommand>
    {
        private readonly IRideRepository _repository;

        public AddRideToGroupCommandHandler(IRideRepository repository)
        {
            _repository = repository;
        }


        protected override async Task Handle(AddRideToGroupCommand request, CancellationToken cancellationToken)
        {
            var ride = await _repository.GetByIdAsync(request.RideId);
            ride.GroupId = request.RideId;
            await _repository.SaveAsync(cancellationToken);
        }
    }
}
