using System.Collections.Generic;
using CSharpFunctionalExtensions;

namespace Domain.ValueObjects
{
	public class Location : ValueObject
	{
		public Location() { }

		public Location(double longitude, double latitude)
			=> (Longitude, Latitude) = (longitude, latitude);

		public double Longitude { get; set; }

		public double Latitude { get; set; }

		protected override IEnumerable<object> GetEqualityComponents()
		{
			yield return Longitude;
			yield return Latitude;
		}
	}
}