using System.Threading;
using System.Threading.Tasks;

namespace Domain.Contracts.Repositories.Intersections
{
	public interface IUserGroupRepository
	{
		Task AddAsync(Domain.Entities.Intersections.UserGroup userGroup, CancellationToken cancellationToken);
	}
}