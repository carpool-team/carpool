using Domain.ValueObjects;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupCommands
{
	public class UpdateGroupCommand : IRequest<GroupId>
	{
		[JsonConstructor]
		public UpdateGroupCommand(GroupId groupId, Location? location, string name, string code, UserId? ownerId)
		{
			GroupId = groupId;
			Location = location;
			Name = name;
			Code = code;
			OwnerId = ownerId;
		}

		public GroupId GroupId { get; set; }

		public Location? Location { get; set; }

		public string Name { get; set; }

		public string Code { get; set; }

		public UserId? OwnerId { get; set; }
	}
}