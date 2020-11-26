using System;

namespace IdentifiersShared.Identifiers
{
	public record RideId(Guid Value);

	public record GroupId(Guid Value);

	public record GroupInviteId(Guid Value);

	public record StopId(Guid Value);

	public record VehicleId(Guid Value);

	public record UserId(Guid Value);
}