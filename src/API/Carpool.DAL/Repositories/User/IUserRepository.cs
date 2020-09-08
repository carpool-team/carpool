using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Carpool.DAL.Repositories.User
{
    public interface IUserRepository : IBaseRepository<Core.Models.User>
    {
        IAsyncEnumerable<Core.Models.User> GetGroupUsersByGroupIdAsync(Guid id);
    }
}
