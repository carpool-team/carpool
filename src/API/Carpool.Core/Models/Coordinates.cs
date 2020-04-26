using Carpool.Core.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Carpool.Core.Models
{
	public class Coordinates : ParentModel
	{
		[Required]
		public double Longitude { get; set; }

		[Required]
		public double Latitude { get; set; }
	}
}