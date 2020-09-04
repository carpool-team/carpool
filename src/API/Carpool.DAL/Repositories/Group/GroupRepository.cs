using System;
using System.Collections.Generic;
using System.Text;
using Carpool.DAL.DatabaseContexts;

namespace Carpool.DAL.Repositories.Group
{
    public class GroupRepository : BaseRepository<Core.Models.Group>, IGroupRepository
    {
        public GroupRepository(CarpoolDbContext context) : base(context)
        {
        }
    }
}
