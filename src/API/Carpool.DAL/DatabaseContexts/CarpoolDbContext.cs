using System;
using System.Reflection;
using Carpool.Core.Models;
using Carpool.Core.Models.Intersections;
using Carpool.Core.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.DatabaseContexts
{
	public class CarpoolDbContext : DbContext
	{
		public CarpoolDbContext(DbContextOptions<CarpoolDbContext> options)
			: base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			_ = modelBuilder ?? throw new NullReferenceException(nameof(modelBuilder));

			base.OnModelCreating(modelBuilder);

			modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
		}

		#region Intersections

		public DbSet<UserParticipatedRide> UserParticipatedRides { get; set; }

		public DbSet<UserGroup> UserGroups { get; set; }

		#endregion Intersections

		#region Models
		public DbSet<ApplicationUser> Users { get; set; }
		public DbSet<Group> Groups { get; set; }
		public DbSet<Ride> Rides { get; set; }
		public DbSet<Stop> Stops { get; set; }
		public DbSet<Rating> Ratings { get; set; }
		public DbSet<Vehicle> Vehicles { get; set; }
		public DbSet<GroupInvite> GroupInvites { get; set; }

		#endregion Models
	}
}