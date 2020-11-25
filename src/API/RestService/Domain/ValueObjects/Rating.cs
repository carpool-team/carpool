using System;
using System.Collections.Generic;
using Domain.Abstract;

namespace Domain.ValueObjects
{
	public class Rating : ValueObject
	{
		public Rating(Guid userId, byte value)
			=> (UserId, Value) = (userId, value);
		

		public Guid UserId { get; init; }
		public byte Value { get; init; }
		protected override IEnumerable<object> GetEqualityComponents()
		{
			yield return UserId;
			yield return Value;
		}
	}
}