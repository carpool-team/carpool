using Carpool.Core.DTOs.StopDTOs;
using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.Text.Json;

namespace Carpool.RestAPI.DTOs.RideDTOs
{
	public class AddRideDTO
	{
		public Guid OwnerId { get; set; }
		public List<Guid> ParticipantsIds { get; set; }

		public List<AddStopDTO> AddStopDTOs { get; set; }

		public Location Destination { get; set; }
		public Location StartingLocation { get; set; }

		private AddRideDTO()
		{
		}

		public static AddRideDTO GetEmpty()
		{
			return new AddRideDTO()
			{
				OwnerId = new Guid(),
				ParticipantsIds = new List<Guid>(),
				AddStopDTOs = new List<AddStopDTO>(),
				Destination = new Location(),
				StartingLocation = new Location()
			};
		}

		public static AddRideDTO GetFromJson(string json)
		{
			AddRideDTO addRideDTO = JsonSerializer.Deserialize<AddRideDTO>(json);
			return addRideDTO;
		}
	}
}