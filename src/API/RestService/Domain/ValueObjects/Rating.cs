using System.Collections.Generic;
using CSharpFunctionalExtensions;

namespace Domain.ValueObjects
{
	public class Rating : ValueObject
	{
		public Rating(byte value)
			=> Value = value;


		public byte Value { get; }

		protected override IEnumerable<object> GetEqualityComponents()
		{
			yield return Value;
		}
	}
}