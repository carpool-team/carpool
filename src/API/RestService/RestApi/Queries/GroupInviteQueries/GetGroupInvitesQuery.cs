using System.Collections.Generic;
using MediatR;
using RestApi.DTOs.GroupInvites;

namespace RestApi.Queries.GroupInviteQueries
{
	public class GetGroupInvitesQuery : IRequest<IEnumerable<IndexGroupInviteDTO>>
	{
	}
}