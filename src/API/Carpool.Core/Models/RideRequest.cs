using System;
using Carpool.Core.Abstract;

namespace Carpool.Core.Models
{
	public class RideRequest : Route
	{
		public User Requester { get; set; }
		public Guid RequesterId { get; set; }

		public DateTime Date { get; set; }
	}
}