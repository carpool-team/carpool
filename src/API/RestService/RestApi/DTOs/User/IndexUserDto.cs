using IdentifiersShared.Identifiers;
using RestApi.DTOs.Vehicle;

namespace RestApi.DTOs.User
{
	public class IndexUserDto
	{
		public IndexUserDto(AppUserId appUserId, string firstName, string lastName, Domain.Entities.Vehicle vehicle) : this(
			appUserId,
			firstName, lastName)
			=> Vehicle = vehicle is null ? null : new IndexVehicleDto(vehicle.Name);

		public IndexUserDto(AppUserId appUserId, string firstName, string lastName) : this(appUserId)
			=> (FirstName, LastName) = (firstName, lastName);

		public IndexUserDto(AppUserId appUserId) : this()
			=> AppUserId = appUserId;

		private IndexUserDto() { }

		public AppUserId AppUserId { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public IndexVehicleDto? Vehicle { get; set; }
	}
}