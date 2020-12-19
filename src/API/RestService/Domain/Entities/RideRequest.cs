using System;
using Domain.Abstract;
using IdentifiersShared.Identifiers;

namespace Domain.Entities
{
	public class RideRequest : BaseEntity<RideRequestId>
	{
		public RideRequest(RideRequestId rideRequestId,
			bool isAccepted,
			bool isPending,
			RideId rideId,
			AppUserId requestingUserId,
			AppUserId rideOwnerId,
			DateTime dateAdded)
		{
			Id = rideRequestId;
			IsAccepted = isAccepted;
			IsPending = isPending;
			RideId = rideId;
			RequestingUserId = requestingUserId;
			RideOwnerId = rideOwnerId;
			DateAdded = dateAdded;
		}

		public RideRequest(bool isAccepted, bool isPending, RideId rideId, Ride ride, AppUserId requestingUserId, ApplicationUser requestingUser, AppUserId rideOwnerId, ApplicationUser rideOwner, DateTime dateAdded)
		{
			IsAccepted = isAccepted;
			IsPending = isPending;
			RideId = rideId;
			Ride = ride;
			RequestingUserId = requestingUserId;
			RequestingUser = requestingUser;
			RideOwnerId = rideOwnerId;
			RideOwner = rideOwner;
			DateAdded = dateAdded;
		}
		
		public RideRequest(){}
		public bool IsAccepted { get; set; }

		public bool IsPending { get; set; }

		public RideId RideId { get; set; }

		public Ride Ride { get; set; }

		public AppUserId RequestingUserId { get; set; }
		public virtual ApplicationUser RequestingUser { get; set; }

		public AppUserId RideOwnerId { get; set; }
		public virtual ApplicationUser RideOwner { get; set; }

		public DateTime DateAdded { get; set; }
	}
}