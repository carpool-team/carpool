using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace Carpool.RestAPI.Commands.Company
{
    public class DeleteCompanyCommand : IRequest
    {
        public DeleteCompanyCommand(int id)
        {
            Id = id;
        }

        public int Id { get; }
    }
}
