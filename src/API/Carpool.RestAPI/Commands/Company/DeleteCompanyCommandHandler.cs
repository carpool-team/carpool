using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Company;
using MediatR;

namespace Carpool.RestAPI.Commands.Company
{
	public class DeleteCompanyCommandHandler : IRequestHandler<DeleteCompanyCommand, int>
	{
		private readonly ICompanyRepository _repository;

		public DeleteCompanyCommandHandler(ICompanyRepository repository)
			=> _repository = repository;

		public async Task<int> Handle(DeleteCompanyCommand request, CancellationToken cancellationToken)
		{
			var company = await _repository.GetByIdAsync(request.Id, cancellationToken).ConfigureAwait(false);
			_repository.Delete(company);
			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			return company.Id;
		}
	}
}