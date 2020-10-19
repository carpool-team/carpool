using System.Collections.Generic;
using Carpool.RestAPI.DTOs.GroupInvitesDTOs;
using MediatR;

namespace Carpool.RestAPI.Queries.GroupInvite
{
	public class GetGroupInvitesQuery : IRequest<IEnumerable<IndexGroupInviteDTO>>
	{
	}
}