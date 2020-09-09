using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace Carpool.RestAPI.Handlers.Queries.Company
{
    public class GetCompanyQuery : IRequest<Core.Models.Company>
    {
        public GetCompanyQuery(Guid id)
        {
            Id = id;
        }
        public Guid Id { get; set; }
    }
}
