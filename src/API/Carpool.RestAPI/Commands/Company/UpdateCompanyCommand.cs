using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Carpool.Core.Models;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Company
{
    public class UpdateCompanyCommand : IRequest
    {
        [JsonConstructor]
        public UpdateCompanyCommand(int id, string name, List<User> users)
        {
            Id = id;
            Name = name;
            Users = users;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public List<User> Users { get; set; }
    }
}
