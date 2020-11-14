using System;

namespace Carpool.Core.ValueObjects
{
	public record Rating
	{
		private Rating() { }
		public Rating(byte value) => (Value) = (value);
		public Rating(Guid userId, byte value) : this(value) => (UserId) = (userId);

		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public byte Value { get; set; }
	}
}