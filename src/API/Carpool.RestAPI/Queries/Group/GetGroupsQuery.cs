using System.Collections.Generic;
using Carpool.RestAPI.DTOs.GroupDTOs;
using MediatR;

namespace Carpool.RestAPI.Queries.Group
{
	public class GetGroupsQuery : IRequest<IEnumerable<IndexGroupDTO>>
	{
		public int PageCount { get; set; }
		public int PagesToSkip { get; set; }
	}
}