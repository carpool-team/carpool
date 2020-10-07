using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Queries.RideRequest
{
	public class GetRideRequestByIdQuery : IRequest<Core.Models.RideRequest>
	{
		[JsonConstructor]
		public GetRideRequestByIdQuery(Guid id)
		{
			Id = id;
		}

		public Guid Id { get; set; }
	}
}