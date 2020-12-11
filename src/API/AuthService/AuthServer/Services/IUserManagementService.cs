using System.Threading.Tasks;
using RestApi.DTOs.User;
using RestEase;

namespace AuthServer.Services
{
	public interface IUserManagementService
	{
		[Post("api/users")]
		Task CreateUser([Body] AddUserDto addUser);
	}
}