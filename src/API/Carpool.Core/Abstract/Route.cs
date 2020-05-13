using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.Abstract
{
	public abstract class Route : ParentModel
	{
		public Location Destination { get; set; }
		public Location StartingLocation { get; set; }
	}
}