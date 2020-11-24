﻿using System;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.GroupCommands
{
	public class ChangeGroupLocationCommand : IRequest
	{
		[JsonConstructor]
		public ChangeGroupLocationCommand(double longitude, double latitude)
			=> (Longitude, Latitude) = (longitude, latitude);

		public double Longitude { get; set; }
		public double Latitude { get; set; }
		public Guid GroupId { get; set; }
	}
}