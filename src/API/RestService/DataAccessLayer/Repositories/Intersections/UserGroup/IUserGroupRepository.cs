using System.Threading;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.Intersections.UserGroup
{
	public interface IUserGroupRepository
	{
		Task AddAsync(Domain.Entities.Intersections.UserGroup userGroup, CancellationToken cancellationToken);
	}
}