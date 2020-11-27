namespace IdentifiersShared.Identifiers
{
	public record RideId(long Value) : StronglyTypedId<long>(Value);

	public record GroupId(long Value) : StronglyTypedId<long>(Value);

	public record GroupInviteId(long Value) : StronglyTypedId<long>(Value);

	public record StopId(long Value) : StronglyTypedId<long>(Value);

	public record VehicleId(long Value) : StronglyTypedId<long>(Value);

	public record UserId(long Value) : StronglyTypedId<long>(Value);
}