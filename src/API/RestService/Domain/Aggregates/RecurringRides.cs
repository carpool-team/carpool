using System.Collections.Generic;
using System.Linq;
using Domain.Abstract;
using Domain.Entities;
using IdentifiersShared.Identifiers;

namespace Domain.Aggregates
{
	public class RecurringRides : AggregateRoot<RecurringRideId>
	{
		public RecurringRides(RecurringRideId recurringRideId, IEnumerable<Ride>? rides = null)
		{
			Id = recurringRideId;
			_rides = (rides ?? Enumerable.Empty<Ride>()).ToList();
		}
		
		
		private RecurringRides(){}
		
		private readonly List<Ride> _rides;
		public IReadOnlyCollection<Ride> Rides => _rides;

		public void AddRide(Ride ride)
			=> _rides.Add(ride);
	}
}