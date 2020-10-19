using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Company;
using MediatR;

namespace Carpool.RestAPI.Queries.Company
{
	public class GetCompaniesQueryHandler : IRequestHandler<GetCompaniesQuery, List<Core.Models.Company>>
	{
		private readonly ICompanyRepository _repository;

		public GetCompaniesQueryHandler(ICompanyRepository repository)
			=> _repository = repository;


		public async Task<List<Core.Models.Company>> Handle(GetCompaniesQuery request, CancellationToken cancellationToken)
		{
			return await _repository.GetRangeAsNoTrackingAsync(request.Count, request.Page).ConfigureAwait(false);
		}
	}
}