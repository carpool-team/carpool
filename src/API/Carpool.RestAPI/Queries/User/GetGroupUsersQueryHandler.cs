using System.Collections.Generic;
using Carpool.Core.DTOs.UserDTOs;
using Carpool.DAL.Repositories.User;
using MediatR;

namespace Carpool.RestAPI.Queries.User
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
