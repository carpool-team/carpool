using System.Collections.Generic;
using MediatR;

namespace Carpool.RestAPI.Queries.Company
{
	public class GetCompaniesQuery : IRequest<IAsyncEnumerable<Core.Models.Company>>
	{
		public int PageCount { get; set; }
		public int PagesToSkip { get; set; }
	}
}