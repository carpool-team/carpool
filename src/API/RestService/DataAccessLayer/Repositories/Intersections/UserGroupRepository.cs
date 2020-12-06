using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.DatabaseContexts;
using Domain.Contracts.Repositories.Intersections;

namespace DataAccessLayer.Repositories.Intersections
{
	public class UserGroupRepository : IUserGroupRepository
	{
		private readonly CarpoolDbContext _context;

		public UserGroupRepository(CarpoolDbContext context)
			=> _context = context;

		public async Task AddAsync(Domain.Entities.Intersections.UserGroup userGroup,
			CancellationToken cancellationToken = default)
			=> await _context.UserGroups.AddAsync(userGroup, cancellationToken).ConfigureAwait(false);
	}
}