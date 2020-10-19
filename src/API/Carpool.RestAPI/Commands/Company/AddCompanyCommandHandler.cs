using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Company;
using MediatR;

namespace Carpool.RestAPI.Commands.Company
{
	public class AddCompanyCommandHandler : IRequestHandler<AddCompanyCommand, int>
	{
		private readonly ICompanyRepository _repository;

		public AddCompanyCommandHandler(ICompanyRepository repository)
			=> _repository = repository;

		public async Task<int> Handle(AddCompanyCommand request, CancellationToken cancellationToken)
		{
			var company = new Core.Models.Company();
			company.Name = request.Name;
			company.Users = request.Users;
			await _repository.AddAsync(company, cancellationToken).ConfigureAwait(false);
			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			return company.Id;
		}
	}
}