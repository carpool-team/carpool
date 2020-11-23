using System.Collections.Generic;
using MediatR;
using RestApi.DTOs.Group;

namespace RestApi.Queries.GroupQueries
{
	public class GetGroupsQuery : IRequest<IEnumerable<IndexGroupDTO>>
	{
		public GetGroupsQuery(int page, int count)
		{
			Page = page;
			Count = count;
		}

		public int Page { get; set; }
		public int Count { get; set; }
	}
}