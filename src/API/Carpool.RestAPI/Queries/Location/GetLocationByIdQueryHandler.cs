using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Location;
using MediatR;

namespace Carpool.RestAPI.Queries.Location
{
	public class GetLocationByIdQueryHandler : IRequestHandler<GetLocationByIdQuery, Core.Models.Location>
	{
		private readonly ILocationRepository _repository;

		public GetLocationByIdQueryHandler(ILocationRepository repository)
			=> _repository = repository;

		public async Task<Core.Models.Location> Handle(GetLocationByIdQuery request,
		                                               CancellationToken cancellationToken)
		{
			var location = await _repository.GetByIdAsNoTrackingAsync(request.LocationId, cancellationToken)
			                                .ConfigureAwait(false);

			if (location == null) throw new NullReferenceException();

			return location;
		}
	}
}