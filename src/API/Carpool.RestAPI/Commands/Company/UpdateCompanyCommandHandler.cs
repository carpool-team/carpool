using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Company;
using Carpool.RestAPI.Commands.Company;
using MediatR;
using Microsoft.CodeAnalysis.CSharp;
using SQLitePCL;

namespace Carpool.RestAPI.Handlers.Commands.Company
{
    public class UpdateCompanyCommandHandler : AsyncRequestHandler<UpdateCompanyCommand>
    {
        private readonly ICompanyRepository _repository;

        public UpdateCompanyCommandHandler(ICompanyRepository repository)
        {
            _repository = repository;
        }

        protected override async Task Handle(UpdateCompanyCommand request, CancellationToken cancellationToken)
        {
            var company = await _repository.GetByIdAsync(request.Id, cancellationToken).ConfigureAwait(false);
            company.Name = request.Name;
            company.Users = request.Users;
            await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
        }
    }
}
