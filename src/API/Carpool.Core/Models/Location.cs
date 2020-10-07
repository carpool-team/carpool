using Carpool.Core.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json;

namespace Carpool.Core.Models
{
	public class Location : BaseEntity<Guid>
	{
		[Required]
		public double Longitude { get; set; }

		[Required]
		public double Latitude { get; set; }

		public string Name { get; set; }
	}
}