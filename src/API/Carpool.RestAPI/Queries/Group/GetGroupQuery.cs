using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Queries.Group
{
	public class GetGroupQuery : IRequest<Core.Models.Group>
	{
		[JsonConstructor]
		public GetGroupQuery(Guid id)
			=> Id = id;

		public Guid Id { get; set; }
	}
}