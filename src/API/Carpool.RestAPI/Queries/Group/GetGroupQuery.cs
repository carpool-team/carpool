using System;
using Carpool.RestAPI.DTOs.GroupDTOs;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Queries.Group
{
	public class GetGroupQuery : IRequest<GroupDetailsDto>
	{
		[JsonConstructor]
		public GetGroupQuery(Guid id)
			=> Id = id;

		public Guid Id { get; set; }
	}
}