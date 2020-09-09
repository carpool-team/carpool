using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace Carpool.RestAPI.Queries.Company
{
    public class GetCompaniesQuery : IRequest<IAsyncEnumerable<Core.Models.Company>>
    {
        public int PageCount { get; set; }
        public int PagesToSkip { get; set; }
    }
}
