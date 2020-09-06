using System;
using System.ComponentModel.DataAnnotations;

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