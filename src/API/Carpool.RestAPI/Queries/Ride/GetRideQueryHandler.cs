using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Ride;
using MediatR;

namespace Carpool.RestAPI.Queries.Ride
{
	public class GetRideQueryHandler : IRequestHandler<GetRideQuery, Core.Models.Ride>
	{
		private readonly IRideRepository _repository;

		public GetRideQueryHandler(IRideRepository repository)
			=> _repository = repository;

		public async Task<Core.Models.Ride> Handle(GetRideQuery request, CancellationToken cancellationToken)
		{
			var ride = await _repository.GetByIdAsync(request.RideId, cancellationToken).ConfigureAwait(false);
			_ = ride ?? throw new NullReferenceException(nameof(ride));
			return ride;
		}
	}
}