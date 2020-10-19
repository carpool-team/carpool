using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.DAL.Repositories.GroupInvite;
using Carpool.RestAPI.DTOs.GroupDTOs;
using Carpool.RestAPI.DTOs.GroupInvitesDTOs;
using MediatR;

namespace Carpool.RestAPI.Queries.GroupInvite
{
	public class
		GetGroupInvitesQueryHandler : IRequestHandler<GetGroupInvitesQuery, IEnumerable<IndexGroupInviteDTO>>
	{
		private readonly IGroupInviteRepository _repository;

		public GetGroupInvitesQueryHandler(IGroupInviteRepository repository)
			=> _repository = repository;

		public async Task<IEnumerable<IndexGroupInviteDTO>> Handle(GetGroupInvitesQuery request,
		                                                                       CancellationToken cancellationToken)
		{
			var groupInvites = await _repository.GetPartAsync(cancellationToken).ConfigureAwait(false);
			try
			{
				var groupInviteDtos = groupInvites.Select(x => new IndexGroupInviteDTO(x.Id, x.IsPending, x.IsAccepted,
					x.GroupId, "x.Group.Name", x.InvitedUserId, x.DateAdded));

				return groupInviteDtos;
			}
			catch (Exception ex)
			{
				throw new ApiException(ex);
			}
		}	
	}
}