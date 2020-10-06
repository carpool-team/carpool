using System.Collections.Generic;
using Carpool.Core.DTOs.GroupDTOs;
using Carpool.DAL.Repositories.Group;
using MediatR;

namespace Carpool.RestAPI.Queries.Group
{
    public class GetGroupsQueryHandler : RequestHandler<GetGroupsQuery, IAsyncEnumerable<IndexGroupDTO>>
    {
        private readonly IGroupRepository _repository;

        public GetGroupsQueryHandler(IGroupRepository repository)
        {
            _repository = repository;
        }


        protected override async IAsyncEnumerable<IndexGroupDTO> Handle(GetGroupsQuery request)
        {
            var groups = _repository.GetRangeAsync(request.PageCount, request.PagesToSkip);
            await foreach (var group in groups)
            {
                yield return IndexGroupDTO.FromGroup(group);
            }
        }
    }
}
