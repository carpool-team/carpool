using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Queries.Location
{
	public class GetLocationByIdQuery : IRequest<Core.Models.Location>
	{
		[JsonConstructor]
		public GetLocationByIdQuery(Guid locationId)
			=> LocationId = locationId;

		public Guid LocationId { get; set; }
	}
}