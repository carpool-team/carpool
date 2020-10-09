using System.Collections.Generic;
using MediatR;

namespace Carpool.RestAPI.Queries.GroupInvite
{
	public class GetGroupInvitesQuery : IRequest<IEnumerable<Core.Models.GroupInvite>>
	{
	}
}