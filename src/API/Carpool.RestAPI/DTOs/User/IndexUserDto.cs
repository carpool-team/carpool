using System;
using Carpool.RestAPI.DTOs.Vehicle;

namespace Carpool.RestAPI.DTOs.User
{
	public class IndexUserDto
	{
		public IndexUserDto(Guid userId, string firstName, string lastName, Core.Models.Vehicle vehicle) : this(userId,
			firstName, lastName)
			=> Vehicle = vehicle is null ? null : new IndexVehicleDto(vehicle.Name);

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
		public IndexVehicleDto? Vehicle { get; set; }
	}
}