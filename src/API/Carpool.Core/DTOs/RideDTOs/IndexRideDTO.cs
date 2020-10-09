using System;
using System.Collections.Generic;
using System.Linq;
using Carpool.Core.DTOs.StopDTOs;
using Carpool.Core.DTOs.UserDTOs;
using Carpool.Core.Models;

namespace Carpool.Core.DTOs.RideDTOs
{
	public class IndexRideDTO
	{
		private IndexRideDTO()
		{
		}

		public Guid Id { get; set; }
		public IndexUserDTO Owner { get; set; }
		public List<IndexUserDTO> Participants { get; set; }

		public List<IndexStopDTO> Stops { get; set; }

		public Location Destination { get; set; }
		public Location StartingLocation { get; set; }

		public DateTime Date { get; set; }

		public bool IsUserParticipant { get; set; }

		public static IndexRideDTO FromRide(Ride ride)
		{
			return new IndexRideDTO
			{
				Id = ride.Id,
				Owner = IndexUserDTO.FromUser(ride.Owner),
				Participants = ride.Participants != null ?
					               ride.Participants.Select(participant => IndexUserDTO.FromUser(participant.User))
					                   .ToList() :
					               null,
				Stops = ride.Stops != null ? ride.Stops.Select(stop => IndexStopDTO.GetFromStop(stop)).ToList() : null,
				Destination = ride.Destination ?? null,
				StartingLocation = ride.StartingLocation ?? null,
				Date = ride.Date
			};
		}
	}
}