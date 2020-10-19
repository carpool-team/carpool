using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;

namespace Carpool.RestAPI.Queries.Company
{
	public class GetCompaniesQuery : IRequest<List<Core.Models.Company>>
	{
		public GetCompaniesQuery(int count, int page)
		{
			Count = count;
			Page = page;
		}
		
		// public GetCompaniesQuery(){}
		
		public int Count { get; set; }
		public int Page { get; set; }
	}
}