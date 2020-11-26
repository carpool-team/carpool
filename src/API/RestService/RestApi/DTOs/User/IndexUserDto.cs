using IdentifiersShared.Identifiers;
using RestApi.DTOs.Vehicle;

namespace RestApi.DTOs.User
{
	public class IndexUserDto
	{
		public IndexUserDto(UserId userId, string firstName, string lastName, Domain.Entities.Vehicle vehicle) : this(
			userId,
			firstName, lastName)
			=> Vehicle = vehicle is null ? null : new IndexVehicleDto(vehicle.Name);

		public IndexUserDto(UserId userId, string firstName, string lastName) : this(userId)
		{
			FirstName = firstName;
			LastName = lastName;
		}

		public IndexUserDto(UserId userId) : this()
			=> UserId = userId;

		private IndexUserDto() { }

		public UserId UserId { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public IndexVehicleDto? Vehicle { get; set; }
	}
}