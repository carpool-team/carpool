using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace Carpool.RestAPI.Commands.Company
{
    public class DeleteCompanyCommand : IRequest
    {
        public DeleteCompanyCommand(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; }
    }
}
