using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Carpool.Core.Models;
using Carpool.Core.Models.Intersections;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Group
{
    public class UpdateGroupCommand : IRequest
    {
        [JsonConstructor]
        public UpdateGroupCommand(Guid id, Guid locationId, string name, string code, Guid? ownerId)
        {
            Id = id;
            LocationId = locationId;
            Name = name;
            Code = code;
            OwnerId = ownerId;
        }

        public Guid Id { get; set; }

        public Guid LocationId { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public Guid? OwnerId { get; set; }

    }
}
