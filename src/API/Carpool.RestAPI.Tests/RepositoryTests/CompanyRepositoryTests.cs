using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoFixture;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.DAL.Repositories.Company;
using Carpool.RestAPI.Controllers;
using Carpool.RestAPI.Tests.Fixtures;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using Xunit.Abstractions;

namespace Carpool.RestAPI.Tests.RepositoryTests
{
	public class CompanyRepositoryTests : IClassFixture<DatabaseFixture>
	{
		private DatabaseFixture _fixture;
		private readonly ITestOutputHelper _output;
		public CompanyRepositoryTests(ITestOutputHelper output)
		{
			_fixture = new DatabaseFixture();
			_output = output;
		}

		public void Dispose()
		{
			_fixture?.Dispose();
		}
		
		[Fact]
		public async Task CompanyRepository_Returns_Company_Range()
		{
			//Arrange
			var dbContext = _fixture.DbContext;
			ICompanyRepository repository = new CompanyRepository(dbContext);

			//Act
			var companies = await repository.GetRangeAsNoTrackingAsync(5, 0);

			//Assert
			Assert.NotNull(companies);
			Assert.NotEmpty(companies);
		}

		[Fact]
		public async Task CompanyRepository_Returns_Company_By_Id()
		{
			//Arrange
			var dbContext = _fixture.DbContext;
			ICompanyRepository repository = new CompanyRepository(dbContext);
			var companyId = dbContext.Companies.FirstOrDefault().Id;
			
			//Act
			var company = await repository.GetByIdAsNoTrackingAsync(companyId, CancellationToken.None);
			
			//Assert
			Assert.NotNull(company);
			Assert.NotNull(company.Users);
			Assert.NotEmpty(company.Name);
		}

		[Fact]
		public async Task CompanyRepository_Removed_Company_By_Id()
		{
			//Arrange
			var dbContext = _fixture.DbContext;
			ICompanyRepository repository = new CompanyRepository(dbContext);
			
			//Act
			var company = dbContext.Companies.FirstOrDefault();
			await repository.DeleteByIdAsync(company.Id);
			repository.Save();
			
			//Assert
			Assert.DoesNotContain(company, dbContext.Companies);
		}
		
		[Fact]
		public void CompanyRepository_Removed_Company_By_Entity()
		{
			//Arrange
			var dbContext = _fixture.DbContext;
			ICompanyRepository repository = new CompanyRepository(dbContext);
			var company = dbContext.Companies.FirstOrDefault();
			
			//Act
			repository.Delete(company);
			repository.Save();
			
			//Assert
			Assert.DoesNotContain(company, dbContext.Companies);
		}
	}
}