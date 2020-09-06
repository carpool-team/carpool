using Carpool.Core.DTOs.GroupDTOs;
using Carpool.DAL.Repositories.Group;
using Carpool.RestAPI.Commands.Group;
using MediatR;
using System.Collections.Generic;

namespace Carpool.RestAPI.Handlers.Group
{
    public class GetGroupsCommandHandler : RequestHandler<GetGroupsCommand, IAsyncEnumerable<IndexGroupDTO>>
    {
        private readonly IGroupRepository _repository;

        public GetGroupsCommandHandler(IGroupRepository repository)
        {
            _repository = repository;
        }


        protected override async IAsyncEnumerable<IndexGroupDTO> Handle(GetGroupsCommand request)
        {
            var groups = _repository.GetRangeAsync(request.PageCount, request.PagesToSkip);
            await foreach (var group in groups)
            {
                yield return IndexGroupDTO.FromGroup(group);
            }
        }
    }
}
