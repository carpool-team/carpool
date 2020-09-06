using Carpool.Core.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json;

namespace Carpool.Core.Models
{
	public class Location : BaseEntity
	{
		[Required]
		public Coordinates Coordinates { get; set; }
		[Required]

		public string Name { get; set; }
	}
}