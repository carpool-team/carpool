using System.Threading;
using System.Threading.Tasks;

namespace Carpool.DAL.Repositories.Intersections.UserGroup
{
	public interface IUserGroupRepository
	{
		Task AddAsync(Core.Models.Intersections.UserGroup userGroup, CancellationToken cancellationToken);
	}
}