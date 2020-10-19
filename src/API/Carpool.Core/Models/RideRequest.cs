using System;
using Carpool.Core.Abstract;

namespace Carpool.Core.Models
{
	public class RideRequest : Route
	{
		public Guid RequesterId { get; set; }

		public DateTime Date { get; set; }
	}
}