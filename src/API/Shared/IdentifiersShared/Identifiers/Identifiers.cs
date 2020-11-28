namespace IdentifiersShared.Identifiers
{
	public sealed record RideId(long Value) : StronglyTypedId<long>(Value);

	public sealed record GroupId(long Value) : StronglyTypedId<long>(Value);

	public sealed record GroupInviteId(long Value) : StronglyTypedId<long>(Value);

	public sealed record StopId(long Value) : StronglyTypedId<long>(Value);

	public sealed record VehicleId(long Value) : StronglyTypedId<long>(Value);

	public sealed record UserId(long Value) : StronglyTypedId<long>(Value);
}