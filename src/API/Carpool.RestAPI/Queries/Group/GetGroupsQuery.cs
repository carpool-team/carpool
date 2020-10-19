using System.Collections.Generic;
using Carpool.RestAPI.DTOs.GroupDTOs;
using MediatR;

namespace Carpool.RestAPI.Queries.Group
{
	public class GetGroupsQuery : IRequest<IEnumerable<IndexGroupDTO>>
	{
        public GetGroupsQuery(int pageCount, int pagesToSkip)
        {
            PageCount = pageCount;
            PagesToSkip = pagesToSkip;
        }

        public int PageCount { get; set; }
		public int PagesToSkip { get; set; }
	}
}