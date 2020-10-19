using System;
using Carpool.Core.Models;
using Carpool.RestAPI.DTOs.Vehicle;

namespace Carpool.RestAPI.DTOs.UserDTOs
{
	public class IndexUserDto
	{
		public IndexUserDto(Guid userId, string firstName, string lastName, Core.Models.Vehicle vehicle) : this(userId, firstName, lastName)
		{
			Vehicle = new IndexVehicleDto(vehicle.Name);
		}

		public IndexUserDto(Guid userId, string firstName, string lastName) : this(userId)
		{
			FirstName = firstName;
			LastName = lastName;
		}

		public IndexUserDto(Guid userId) : this()
			=> UserId = userId;

		private IndexUserDto()
		{
		}

		public Guid UserId { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public IndexVehicleDto Vehicle { get; set; }
		
	}
}