using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.DTOs.UserDTOs
{
	public class IndexUserDTO
	{
		public Guid UserId { get; set; }
		public String FirstName { get; set; }
		public String LastName { get; set; }

		private IndexUserDTO()
		{
		}

		public static IndexUserDTO GetFromUser(User user)
		{
			return new IndexUserDTO()
			{
				UserId = user.Id,
				FirstName = user.FirstName,
				LastName = user.LastName,
			};
		}
	}
}