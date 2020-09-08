using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace Carpool.RestAPI.Commands.Group
{
    public class DeleteGroupCommand : IRequest
    {
        public DeleteGroupCommand(Guid id)
        {
            Id = id;
        }
        public Guid Id { get; set; }
    }
}
