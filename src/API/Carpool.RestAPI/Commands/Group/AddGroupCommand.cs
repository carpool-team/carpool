using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Group
{
    public class AddGroupCommand : IRequest
    {
        [JsonConstructor]
        public AddGroupCommand(string name, string code, Guid id, Guid ownerId)
        {
            Name = name;
            Code = code;
            Id = id;
            OwnerId = ownerId;
        }

        [Required]
        public string Name { get; set; }

        public string Code { get; set; }

        public Guid Id { get; set; }

        public Guid OwnerId { get; set; }
    }
}
