using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Carpool.Core.Models;
using Carpool.RestAPI.Commands.Company;
using Carpool.RestAPI.Queries.Company;
using MediatR;
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
		public async Task<ActionResult<List<Company>>> GetCompanies(GetCompaniesQuery query)
		{
			var response = await _mediator.Send(query).ConfigureAwait(false);
			return await response.ToListAsync().ConfigureAwait(false);
		}

		// GET: api/Companies/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Company>> GetCompany(int id)
		{
			var response = await _mediator.Send(new GetCompanyQuery(id)).ConfigureAwait(false);
			return Ok(response);
		}

		// PUT: api/Companies/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{companyId}")]
		public async Task<IActionResult> PutCompany(Guid companyId, UpdateCompanyCommand request)
		{
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return Ok();
		}

		// POST: api/Companies
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ActionResult<Company>> PostCompany(AddCompanyCommand request)
		{
			var response = await _mediator.Send(request).ConfigureAwait(false);
			return Ok();
		}

		// DELETE: api/Companies/5
		[HttpDelete("{id}")]
		public async Task<ActionResult<Company>> DeleteCompany(int id)
		{
			var response = await _mediator.Send(new DeleteCompanyCommand(id)).ConfigureAwait(false);
			return Ok();
		}
	}
}