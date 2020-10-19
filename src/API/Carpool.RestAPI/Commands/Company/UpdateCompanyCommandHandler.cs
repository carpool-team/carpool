using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.DAL.Repositories.Company;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Carpool.RestAPI.Commands.Company
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
			_ = company ?? throw new ApiException($"Company with id: {request.Id} does not exist.",
				    StatusCodes.Status404NotFound);
			company.Name = request.Name ?? company.Name;
			company.Users = request?.Users.Any() ?? false ? request.Users : company.Users;
			try
			{
				await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}