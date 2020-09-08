using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.Core.DTOs.GroupDTOs;
using Carpool.Core.DTOs.UserDTOs;
using Carpool.DAL.Repositories.Group;
using Carpool.DAL.Repositories.User;
using Carpool.RestAPI.Queries.User;
using MediatR;

namespace Carpool.RestAPI.Handlers.Queries.User
{
    public class GetGroupUsersQueryHandler : RequestHandler<GetGroupUsersQuery, IAsyncEnumerable<IndexUserDTO>>
    {
        private readonly IUserRepository _repository;

        public GetGroupUsersQueryHandler(IUserRepository repository)
        {
            _repository = repository;
        }

        protected override async IAsyncEnumerable<IndexUserDTO> Handle(GetGroupUsersQuery request)
        {
            var users = _repository.GetGroupUsersByGroupIdAsync(request.Id);
            await foreach (var user in users)
            {
                yield return IndexUserDTO.FromUser(user);
            }
        }
    }
}
