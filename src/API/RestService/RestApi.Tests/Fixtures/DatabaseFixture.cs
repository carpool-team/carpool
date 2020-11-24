using System;
using System.Collections.Generic;
using System.Linq;
using AutoFixture;
using Carpool.Core.Models;
using Carpool.Core.Models.Intersections;
using Carpool.DAL.ContextFactories;
using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace RestApi.Tests.Fixtures
{
	public class DatabaseFixture : IDisposable
	{
		//Repeat count has to be even, because odd values cause one user to invite himself to group owned by him
		public readonly CarpoolDbContextFactory ContextFactory;
		private readonly DbContextOptions<CarpoolDbContext> _options;
		public CarpoolDbContext DbContext;

		public DatabaseFixture()
		{
			var random = new Random();
			var fixture = new Fixture() {RepeatCount = repeatCount};
			_options = new DbContextOptionsBuilder<CarpoolDbContext>().UseInMemoryDatabase("CarpoolDb").Options;
			ContextFactory = new CarpoolDbContextFactory(_options);
			DbContext = ContextFactory.GetNewDbContext();


			var locations = fixture.CreateMany<Location>().ToList();

			var mockLocation = fixture.Create<Location>();
			var mockLocationId = mockLocation.Id;
			locations.Add(mockLocation);

			var vehicles = fixture.CreateMany<Vehicle>().ToList();

			var users = new List<User>();
			for (var i = 0; i <= iterRepeatCount; i++)
				users.Add(fixture.Build<User>().With(x => x.VehicleId, vehicles[i].Id)
				                 .Create());

			var groups = new List<Group>();
			for (var i = 0; i <= iterRepeatCount; i++)
				groups.Add(fixture.Build<Group>().With(x => x.LocationId, locations[i].Id)
				                  .With(x => x.OwnerId, users[i].Id).Create());

			var groupInvites = new List<GroupInvite>();
			for (var i = iterRepeatCount; i >= 0; i--)
				groupInvites.Add(fixture.Build<GroupInvite>().With(x => x.IsPending, i > 1)
				                        .With(x => x.InvitedUserId, users[i].Id)
				                        .With(x => x.InvitedUserId, groups[iterRepeatCount - i].OwnerId)
				                        .With(x => x.GroupId, groups[iterRepeatCount - i].Id)
				                        .With(x => x.IsAccepted, i % 2 < 1).Create());

			var userGroups = new List<UserGroup>();
			for (var i = 0; i < iterRepeatCount; i++)
				userGroups.Add(fixture.Build<UserGroup>().With(x => x.GroupId, groups[i].Id)
				                      .With(x => x.UserId, users[i].Id).Create());

			foreach (var groupInvite in groupInvites)
				if (!groupInvite.IsPending && groupInvite.IsAccepted)
					userGroups.Add(new UserGroup {UserId = groupInvite.InvitedUserId, GroupId = groupInvite.GroupId});

			var ratings = new List<Rating>();
			for (var i = 0; i < 2 * repeatCount; i++)
			{
				var rating = fixture.Build<Rating>().With(x => x.UserId, users[i % 4].Id).Create();
				rating.Value = (byte) (rating.Value % 6);
				ratings.Add(rating);
			}

			var rides = new List<Ride>();
			for (var i = 0; i <= iterRepeatCount; i++)
				rides.Add(fixture.Build<Ride>().With(x => x.OwnerId, users[i].Id)
				                 .With(x => x.GroupId, groups[i].Id)
				                 .With(x => x.Date, DateTime.Now.AddDays(random.Next(1, 5)))
				                 .With(x => x.DestinationId, locations[i].Id)
				                 .With(x => x.StartingLocationId, locations[iterRepeatCount - i].Id)
				                 .Create());

			var rideRequests = new List<RideRequest>();
			for (var i = 0; i <= iterRepeatCount; i++)
				rideRequests.Add(fixture.Build<RideRequest>()
				                        .With(x => x.Date, DateTime.Now.AddDays(random.Next(1, 5)))
				                        .With(x => x.RequesterId, users[i].Id)
				                        .With(x => x.DestinationId, locations[i].Id)
				                        .With(x => x.StartingLocationId, locations[iterRepeatCount - i].Id)
				                        .Create());

			var stops = new List<Stop>();
			for (var i = 0; i <= iterRepeatCount; i++)
				stops.Add(fixture.Build<Stop>().With(x => x.LocationId, mockLocation.Id)
				                 .With(x => x.RideId, rides[i].Id)
				                 .With(x => x.UserId, users[i].Id)
				                 .Create());

			var rideParticipants = new List<UserParticipatedRide>();
			for (var i = 0; i <= iterRepeatCount; i++)
				rideParticipants.Add(fixture.Build<UserParticipatedRide>().With(x => x.RideId, rides[i].Id)
				                            .With(x => x.UserId, users[i].Id)
				                            .Create());


			DbContext.Locations.AddRange(locations);

			DbContext.Vehicles.AddRange(vehicles);

			users.ForEach(x => x.Locations = null);
			users.ForEach(x => x.Ratings = null);
			users.ForEach(x => x.Vehicle = null);
			users.ForEach(x => x.CreatedRides = null);
			users.ForEach(x => x.ParticipatedRides = null);
			users.ForEach(x => x.RideRequests = null);
			//users.ForEach(x => x.UserGroups = null);
			//users.ForEach(x => x.SentGroupInvites = null);
			DbContext.Users.AddRange(users);

			groups.ForEach(x => x.Location = null);
			groups.ForEach(x => x.Owner = null);
			//groups.ForEach(x => x.Rides = null);
			groups.ForEach(x => x.UserGroups = null);
			DbContext.Groups.AddRange(groups);
			DbContext.GroupInvites.AddRange(groupInvites);
			DbContext.UserGroups.AddRange(userGroups);

			DbContext.Ratings.AddRange(ratings);

			rides.ForEach(x => x.Participants = null);
			rides.ForEach(x => x.Stops = null);
			rides.ForEach(x => x.Destination = null);
			rides.ForEach(x => x.StartingLocation = null);
			DbContext.Rides.AddRange(rides);

			rideRequests.ForEach(x => x.Destination = null);
			rideRequests.ForEach(x => x.StartingLocation = null);
			DbContext.RideRequests.AddRange(rideRequests);

			DbContext.Stops.AddRange(stops);

			DbContext.UserParticipatedRides.AddRange(rideParticipants);
			DbContext.SaveChanges();
			var x = DbContext.UserGroups.ToList();
			var t = x.Count();
		}

		public void Dispose()
		{
			DbContext.RemoveRange(DbContext.UserParticipatedRides);
			DbContext.RemoveRange(DbContext.Stops);
			DbContext.RemoveRange(DbContext.RideRequests);
			DbContext.RemoveRange(DbContext.Rides);
			DbContext.RemoveRange(DbContext.Ratings);
			DbContext.RemoveRange(DbContext.UserGroups);
			DbContext.RemoveRange(DbContext.GroupInvites);
			DbContext.RemoveRange(DbContext.Groups);
			DbContext.RemoveRange(DbContext.Users);
			DbContext.RemoveRange(DbContext.Vehicles);
			DbContext.RemoveRange(DbContext.Locations);
			DbContext.SaveChanges();
		}

		//Repeat count has to be even, because odd values cause one user to invite himself to group owned by him
		private const int repeatCount = 4;
		private const int iterRepeatCount = repeatCount - 1;
	}
}