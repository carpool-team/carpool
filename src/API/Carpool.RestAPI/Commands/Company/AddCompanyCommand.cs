using System.Collections.Generic;
using Carpool.Core.Models;
using MediatR;

namespace Carpool.RestAPI.Commands.Company
{
	public class AddCompanyCommand : IRequest<int>
	{
		public string Name { get; set; }
		public List<Core.Models.User> Users { get; set; }
	}
}