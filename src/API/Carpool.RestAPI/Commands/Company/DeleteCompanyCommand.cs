﻿using MediatR;

namespace Carpool.RestAPI.Commands.Company
{
	public class DeleteCompanyCommand : IRequest<int>
	{
		public DeleteCompanyCommand(int id)
			=> Id = id;

		public int Id { get; }
	}
}