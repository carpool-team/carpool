using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.DatabaseContexts;

namespace Carpool.DAL.Repositories.Intersections.UserGroup
{
	public class UserGroupRepository : IUserGroupRepository
	{
		private readonly CarpoolDbContext _context;

		public UserGroupRepository(CarpoolDbContext context)
		{
			_context = context;
		}

		public async Task AddAsync(Core.Models.Intersections.UserGroup userGroup, CancellationToken cancellationToken = default)
			=> await _context.UserGroups.AddAsync(userGroup, cancellationToken).ConfigureAwait(false);
	}
}