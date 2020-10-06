using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Company;
using Carpool.RestAPI.Commands.Company;
using MediatR;

namespace Carpool.RestAPI.Handlers.Commands.Company
{
    public class AddCompanyCommandHandler : AsyncRequestHandler<AddCompanyCommand>
    {
        private readonly ICompanyRepository _repository;

        public AddCompanyCommandHandler(ICompanyRepository repository)
        {
            _repository = repository;
        }

        protected override async Task Handle(AddCompanyCommand request, CancellationToken cancellationToken)
        {
            var company = new Core.Models.Company();
            company.Name = request.Name;
            company.Users = request.Users;
            await _repository.AddAsync(company, cancellationToken);
            await _repository.SaveAsync(cancellationToken);
        }
    }
}
