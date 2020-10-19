using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Carpool.Core.Models;
using Carpool.RestAPI.Commands.Company;
using Carpool.RestAPI.Queries.Company;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CompaniesController : ControllerBase
	{
		private readonly IMediator _mediator;

		public CompaniesController(IMediator mediator)
			=> _mediator = mediator;

		// GET: api/Companies
		[HttpGet]
		public async Task<ApiResponse> GetCompanies([FromQuery]int page = 0, [FromQuery]int count = 5)
		{
			var query = new GetCompaniesQuery(page, count);
			var response = await _mediator.Send(query).ConfigureAwait(false);
			return new ApiResponse(response);
		}

		// GET: api/Companies/5
		[HttpGet("{id}")]
		public async Task<ApiResponse> GetCompany(int id)
		{
			var response = await _mediator.Send(new GetCompanyQuery(id)).ConfigureAwait(false);
			return new ApiResponse(response);
		}

		// PUT: api/Companies/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{companyId}")]
		public async Task<ApiResponse> PutCompany(Guid companyId, UpdateCompanyCommand request)
		{
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse($"Company with id: {companyId} has been updated");
		}

		// POST: api/Companies
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ApiResponse> PostCompany(AddCompanyCommand request)
		{
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return new ApiResponse($"Created company with id: {response}", response, StatusCodes.Status201Created);
		}

		// DELETE: api/Companies/5
		[HttpDelete("{id}")]
		public async Task<ApiResponse> DeleteCompany(int id)
		{
			var response = await _mediator.Send(new DeleteCompanyCommand(id)).ConfigureAwait(false);
			return new ApiResponse($"Company with id: {response} has been deleted");
		}
	}
}