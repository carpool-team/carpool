using System;
using MediatR;
using Newtonsoft.Json;
using RestApi.DTOs.Group;

namespace RestApi.Queries.GroupQueries
{
	public class GetGroupQuery : IRequest<GroupDetailsDto>
	{
		[JsonConstructor]
		public GetGroupQuery(Guid id)
			=> Id = id;

		public Guid Id { get; set; }
	}
}