using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;
using RestApi.DTOs.Group;

namespace RestApi.Queries.GroupQueries
{
	public class GetGroupQuery : IRequest<GroupDetailsDto>
	{
		[JsonConstructor]
		public GetGroupQuery(GroupId id)
			=> Id = id;

		public GroupId Id { get; set; }
	}
}