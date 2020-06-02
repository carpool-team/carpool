using Carpool.Core.DTOs.LocationDTOs;
using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Carpool.Core.DTOs.GroupDTOs
{
	public class AddGroupDTO
	{
		[Required]
		public string Name { get; set; }

		public string Code { get; set; }

		public Guid Id { get; set; }

		public Guid OwnerId { get; set; }
	}
}