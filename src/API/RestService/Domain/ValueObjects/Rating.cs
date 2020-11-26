using System;
using System.Collections.Generic;
using CSharpFunctionalExtensions;
using Domain.Abstract;
using IdentifiersShared.Identifiers;

namespace Domain.ValueObjects
{
	public class Rating : ValueObject
	{
		public Rating() { }

		public Rating(UserId userId, byte value)
			=> (UserId, Value) = (userId, value);
		

		public UserId UserId { get; init; }
		public byte Value { get; init; }

		protected override IEnumerable<object> GetEqualityComponents()
		{
			yield return UserId;
			yield return Value;
		}
	}
}