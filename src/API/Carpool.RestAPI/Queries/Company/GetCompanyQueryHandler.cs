using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Company;
using MediatR;

namespace Carpool.RestAPI.Queries.Company
{
	public class GetCompanyQueryHandler : IRequestHandler<GetCompanyQuery, Core.Models.Company>
	{
		private readonly ICompanyRepository _repository;

		public GetCompanyQueryHandler(ICompanyRepository repository)
			=> _repository = repository;

		public async Task<Core.Models.Company> Handle(GetCompanyQuery request, CancellationToken cancellationToken)
			=> await _repository.GetByIdAsNoTrackingAsync(request.Id, cancellationToken).ConfigureAwait(false);
	}
}