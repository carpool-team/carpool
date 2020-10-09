using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.RideRequest;
using MediatR;

namespace Carpool.RestAPI.Queries.RideRequest
{
	public class
		GetRideRequestsQueryHandler : IRequestHandler<GetRideRequestsQuery, IEnumerable<Core.Models.RideRequest>>
	{
		private readonly IRideRequestRepository _repository;

		public GetRideRequestsQueryHandler(IRideRequestRepository repository)
			=> _repository = repository;

		public Task<IEnumerable<Core.Models.RideRequest>> Handle(GetRideRequestsQuery request,
		                                                         CancellationToken cancellationToken)
			=> throw new NotImplementedException();
	}
}