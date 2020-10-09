using System.Collections.Generic;
using Carpool.Core.DTOs.GroupDTOs;
using MediatR;

namespace Carpool.RestAPI.Queries.Group
{
	public class GetGroupsQuery : IRequest<IAsyncEnumerable<IndexGroupDTO>>
	{
		public int PageCount { get; set; }
		public int PagesToSkip { get; set; }
	}
}