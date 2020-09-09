using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Carpool.Core.Models;
using MediatR;

namespace Carpool.RestAPI.Commands.Company
{
    public class AddCompanyCommand : IRequest
    {
        public string Name { get; set; }
        public List<User> Users { get; set; }
    }
}
