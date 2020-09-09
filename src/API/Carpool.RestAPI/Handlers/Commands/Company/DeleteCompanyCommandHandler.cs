using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Company;
using Carpool.RestAPI.Commands.Group;
using MediatR;

namespace Carpool.RestAPI.Handlers.Commands.Company
{
    public class DeleteCompanyCommandHandler : AsyncRequestHandler<DeleteGroupCommand>
    {
        private readonly ICompanyRepository _repository;

        public DeleteCompanyCommandHandler(ICompanyRepository repository)
        {
            _repository = repository;
        }

        protected override async Task Handle(DeleteGroupCommand request, CancellationToken cancellationToken)
        {
            var company = await _repository.GetByIdAsync(request.Id);
            _repository.Delete(company);
            await _repository.SaveAsync(cancellationToken);
        }
    }
}
