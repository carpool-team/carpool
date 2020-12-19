namespace IdentifiersShared.Identifiers
{
	public sealed record RideId(long Value) : StronglyTypedId<long>(Value);

	public sealed record GroupId(long Value) : StronglyTypedId<long>(Value);

	public sealed record GroupInviteId(long Value) : StronglyTypedId<long>(Value);

	public sealed record StopId(long Value) : StronglyTypedId<long>(Value);

	public sealed record VehicleId(long Value) : StronglyTypedId<long>(Value);

	public sealed record AppUserId(long Value) : StronglyTypedId<long>(Value);

	public sealed record IdentityUserId(string Value) : StronglyTypedId<string>(Value);

	public sealed record RideRequestId(long Value) : StronglyTypedId<long>(Value);
}