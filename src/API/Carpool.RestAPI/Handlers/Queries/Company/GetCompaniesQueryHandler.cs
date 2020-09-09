using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Company;
using Carpool.RestAPI.Queries.Company;
using MediatR;

namespace Carpool.RestAPI.Handlers.Queries.Company
{
    public class GetCompaniesQueryHandler : RequestHandler<GetCompaniesQuery, IAsyncEnumerable<Core.Models.Company>>
    {
        private readonly ICompanyRepository _repository;

        public GetCompaniesQueryHandler(ICompanyRepository repository)
        {
            _repository = repository;
        }

        protected override async IAsyncEnumerable<Core.Models.Company> Handle(GetCompaniesQuery request)
        {
            var companies = _repository.GetRangeAsync(request.PageCount, request.PagesToSkip);
            await foreach (var company in companies)
            {
                yield return company;
            }
        }
    }
}
