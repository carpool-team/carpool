using System.Collections.Generic;
using Carpool.Core.Models;
using MediatR;
using Newtonsoft.Json;

namespace Carpool.RestAPI.Commands.Company
{
	public class UpdateCompanyCommand : IRequest
	{
		[JsonConstructor]
		public UpdateCompanyCommand(int id, string name, List<Core.Models.User> users)
		{
			Id = id;
			Name = name;
			Users = users;
		}

		public int Id { get; set; }
		public string Name { get; set; }
		public List<Core.Models.User> Users { get; set; }
	}
}