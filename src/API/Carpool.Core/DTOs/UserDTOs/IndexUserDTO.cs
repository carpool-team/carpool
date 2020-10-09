using System;
using Carpool.Core.Models;

namespace Carpool.Core.DTOs.UserDTOs
{
	public class IndexUserDTO
	{
		private IndexUserDTO()
		{
		}

		public Guid UserId { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public Vehicle Vehicle { get; set; }

		public static IndexUserDTO FromUser(User user)
			=> new IndexUserDTO
			{
				UserId = user.Id,
				FirstName = user.FirstName,
				LastName = user.LastName,
				Vehicle = user.Vehicle ?? null
			};
	}
}