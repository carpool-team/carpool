using System;

namespace Domain.ValueObjects
{
	public record Rating
	{
		public Rating(byte value)
			=> Value = value;

		public Rating(Guid userId, byte value) : this(value)
			=> UserId = userId;

		private Rating()
		{
		}

		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public byte Value { get; set; }
	}
}