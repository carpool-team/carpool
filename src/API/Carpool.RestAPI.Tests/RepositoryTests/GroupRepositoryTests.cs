using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Carpool.Core.Models.Intersections;
using Carpool.DAL.Repositories.Group;
using Carpool.RestAPI.Tests.Fixtures;
using Xunit;
using Xunit.Abstractions;

namespace Carpool.RestAPI.Tests.RepositoryTests
{
	public class GroupRepositoryTests : IDisposable
	{
		private readonly ITestOutputHelper _output;
		private readonly DatabaseFixture _fixture;

		public GroupRepositoryTests(ITestOutputHelper output)
		{
			_fixture = new DatabaseFixture();
			_output = output;
		}

		public void Dispose()
		{
			_fixture?.Dispose();
		}

		[Fact]
		public async Task GroupRepository_Returns_Group_Range()
		{
			//Arrange
			var dbContext = _fixture.DbContext;
			IGroupRepository repository = new GroupRepository(dbContext);

			//Act
			var groups = await repository.GetRangeAsNoTrackingAsync(5, 0);

			//Assert
			Assert.NotNull(groups);
			Assert.NotEmpty(groups);
		}

		[Fact]
		public async Task GroupRepository_Returns_Group_By_Id()
		{
			//Arrange
			var dbContext = _fixture.DbContext;
			IGroupRepository repository = new GroupRepository(dbContext);
			var groupId = dbContext.Groups.FirstOrDefault().Id;

			//Act
			var group = await repository.GetByIdAsNoTrackingAsync(groupId, CancellationToken.None);

			//Assert
			Assert.NotNull(group);
			Assert.NotNull(group.Location);
			Assert.NotNull(group.Owner);
			//Assert.NotNull(group.Rides);
			Assert.NotNull(group.UserGroups);
			Assert.NotEmpty(group.Name);
			Assert.NotEmpty(group.Name);
		}

		[Fact]
		public async Task GroupRepository_Removed_Group_By_Id()
		{
			//Arrange
			var dbContext = _fixture.DbContext;
			IGroupRepository repository = new GroupRepository(dbContext);
			var group = dbContext.Groups.FirstOrDefault();

			//Act
			await repository.DeleteByIdAsync(group.Id);
			await repository.SaveAsync();

			//Assert
			Assert.DoesNotContain(group, dbContext.Groups);
		}

		[Fact]
		public void GroupRepository_Removed_Group_By_Entity()
		{
			//Arrange
			var dbContext = _fixture.DbContext;
			IGroupRepository repository = new GroupRepository(dbContext);
			var group = dbContext.Groups.FirstOrDefault();

			//Act
			repository.Delete(group);
			repository.Save();

			//Assert
			Assert.DoesNotContain(group, dbContext.Groups);
		}

		[Fact]
		public async Task GroupRepository_Add_User_To_Group()
		{
			//Arrange
			var dbContext = _fixture.DbContext;
			IGroupRepository repository = new GroupRepository(dbContext);
			var group = dbContext.Groups.FirstOrDefault();
			var user = dbContext.Users.FirstOrDefault();
			var userGroup = new UserGroup();
			userGroup.GroupId = group.Id;
			userGroup.UserId = user.Id;
			var ug = dbContext.UserGroups.FirstOrDefault(x => x.UserId == user.Id && x.GroupId == group.Id);
			if (ug != null)
			{
				dbContext.UserGroups.Remove(ug);
				dbContext.SaveChanges();
			}

			//Act
			await repository.AddUserToGroupAsync(userGroup);
			await repository.SaveAsync();

			//Assert
			Assert.Contains(userGroup, dbContext.UserGroups);
		}
	}
}