using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Carpool.Core.DTOs.GroupDTOs;
using MediatR;

namespace Carpool.RestAPI.Commands.Group
{
    public class GetGroupsCommand : IRequest<IAsyncEnumerable<IndexGroupDTO>>
    {
        public int PageCount { get; set; }
        public int PagesToSkip { get; set; }
    }
}
