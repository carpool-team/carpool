using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Company;
using Carpool.RestAPI.Commands.Company;
using MediatR;

namespace Carpool.RestAPI.Handlers.Commands.Company
{
	public class DeleteCompanyCommandHandler : AsyncRequestHandler<DeleteCompanyCommand>
	{
		private readonly ICompanyRepository _repository;

		public DeleteCompanyCommandHandler(ICompanyRepository repository)
			=> _repository = repository;

		protected override async Task Handle(DeleteCompanyCommand request, CancellationToken cancellationToken)
		{
			var company = await _repository.GetByIdAsync(request.Id, cancellationToken).ConfigureAwait(false);
			_repository.Delete(company);
			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
		}
	}
}