using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Carpool.Core.Models;
using Carpool.RestAPI.DTOs.StopDTOs;

namespace Carpool.RestAPI.DTOs.RideDTOs
{
	public class AddRideDTO
	{
		private AddRideDTO()
		{
		}

		public List<Guid> ParticipantsIds { get; set; }

		public List<AddStopDTO> AddStopDTOs { get; set; }

		public Guid GroupId { get; set; }

		public Location Destination { get; set; }

		[Required] public Location StartingLocation { get; set; }

		[Required] public DateTime Date { get; set; }

		public double Price { get; set; }

		public static AddRideDTO GetEmpty()
			=> new AddRideDTO
			{
				ParticipantsIds = new List<Guid>(),
				AddStopDTOs = new List<AddStopDTO>(),
				Destination = new Location(),
				StartingLocation = new Location()
			};

		public static AddRideDTO GetFromJson(string json)
		{
			var addRideDTO = JsonSerializer.Deserialize<AddRideDTO>(json);
			return addRideDTO;
		}
	}
}