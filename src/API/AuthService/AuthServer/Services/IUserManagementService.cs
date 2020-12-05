using IdentifiersShared.Identifiers;
using Microsoft.AspNetCore.Mvc;
using RestApi.DTOs.User;
using RestEase;
using System.Threading.Tasks;

namespace AuthServer.Services
{
    public interface IUserManagementService
    {
        [Post("api/users")]
        Task CreateUser([Body] AddUserDto addUser);
    }
}
