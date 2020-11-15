using System.Collections.Generic;
using Carpool.RestAPI.DTOs.Group;
using MediatR;

namespace Carpool.RestAPI.Queries.Group
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