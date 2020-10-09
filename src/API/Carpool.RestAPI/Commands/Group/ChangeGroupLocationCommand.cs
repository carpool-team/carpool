using System;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Group
{
	public class ChangeGroupLocationCommand : IRequest
	{
		[JsonConstructor]
		public ChangeGroupLocationCommand(Guid locationId, Guid groupId)
		{
			LocationId = locationId;
			GroupId = groupId;
		}

		public Guid LocationId { get; set; }
		public Guid GroupId { get; set; }
	}
}