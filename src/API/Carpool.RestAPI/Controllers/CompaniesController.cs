using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.RestAPI.Commands.Company;
using Carpool.RestAPI.Handlers.Queries.Company;
using Carpool.RestAPI.Queries.Company;
using MediatR;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CompaniesController : ControllerBase
	{
		private readonly CarpoolDbContext _context;
        private readonly IMediator _mediator;

		public CompaniesController(CarpoolDbContext context, IMediator mediator)
        {
            _context = context;
            _mediator = mediator;
        }

        // GET: api/Companies
        [HttpGet]
        public async Task<ActionResult<List<Company>>> GetCompanies(GetCompaniesQuery query)
        {
            var response = await _mediator.Send(query);
            return await response.ToListAsync();
        }

		// GET: api/Companies/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Company>> GetCompany(Guid id)
        {
            var response = await _mediator.Send(new GetCompanyQuery(id));
            return Ok(response);
		}

		// PUT: api/Companies/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{companyId}")]
		public async Task<IActionResult> PutCompany(Guid companyId, UpdateCompanyCommand request)
        {
            var response = await _mediator.Send(request);
            return Ok();
        }

		// POST: api/Companies
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ActionResult<Company>> PostCompany(AddCompanyCommand request)
        {
            var response = await _mediator.Send(request);
            return Ok();
        }

		// DELETE: api/Companies/5
		[HttpDelete("{id}")]
		public async Task<ActionResult<Company>> DeleteCompany(Guid id)
        {
            var response = await _mediator.Send(new DeleteCompanyCommand(id));
            return Ok();
        }

		private bool CompanyExists(Guid id)
		{
			return _context.Companies.Any(e => e.Id == id);
		}
	}
}