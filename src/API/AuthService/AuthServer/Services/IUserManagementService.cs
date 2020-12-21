using System.Threading.Tasks;
using IdentifiersShared.Identifiers;
using RestApi.DTOs.User;
using RestEase;

namespace AuthServer.Services
{
	public interface IUserManagementService
	{
		[Post("api/users")]
		[Header("Authorization", "Bearer")]
		Task CreateUser([Body] AddUserDto addUser);

		[Put("api/users/{appUserId}")]
		[Header("Authorization", "Bearer")]
		Task UpdateUser([Path] long appUserId, [Body]UpdateUserDto updateUserDto);
	}
}