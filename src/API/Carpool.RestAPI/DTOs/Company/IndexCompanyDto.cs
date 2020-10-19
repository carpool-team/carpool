using System.Collections.Generic;
using Carpool.RestAPI.DTOs.UserDTOs;
using Carpool.RestAPI.Queries.Company;

namespace Carpool.RestAPI.DTOs.Company
{
	public class IndexCompanyDto
	{
		public IndexCompanyDto(string name, List<IndexUserDto> users)
		{
			Name = name;
			Users = users;
		}

		public string Name { get; set; }
		public List<IndexUserDto> Users { get; set; }
	}
}