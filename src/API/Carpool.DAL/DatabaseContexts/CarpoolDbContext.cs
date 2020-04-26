using Carpool.Core.Models;
using Carpool.Core.Models.Intersections;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.DAL.DatabaseContexts
{
	public class CarpoolDbContext : DbContext
	{
		public CarpoolDbContext(DbContextOptions<CarpoolDbContext> options)
	: base(options)
		{
		}

		public DbSet<Location> Locations { get; set; }
		public DbSet<LocationName> LocationNames { get; set; }
		public DbSet<Coordinates> Coordinates { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<Group> Groups { get; set; }
		public DbSet<Company> Companies { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<UserGroup>()
				.HasKey(ug => new { ug.UserId, ug.GroupId });

			modelBuilder.Entity<UserGroup>()
				.HasOne(ug => ug.User)
				.WithMany(ug => ug.UserGroups)
				.HasForeignKey(ug => ug.UserId);

			modelBuilder.Entity<UserGroup>()
				.HasOne(ug => ug.Group)
				.WithMany(ug => ug.UserGroups)
				.HasForeignKey(ug => ug.GroupId);

			#region DataSeeding

			modelBuilder.Entity<User>().HasData(new User()
			{
				FirstName = "Krzysztof",
				LastName = "Kononowicz",
				Email = "biurointerwencjiobywatelskich@kononowicz.pl",
				Id = new Guid("40ab249f-a1ee-48ec-f24b-08d7e933352c"),
				PhoneNumber = "997997997",
				Locations = new List<Location>()
				{
					new Location()
					{
						Coordinates = new Coordinates()
						{
							Latitude = 23.086287,
							Longitude = 53.123454,
							Id = new Guid("81c9e763-7c57-4e9c-a263-08d7e930c1ef")
						},
						LocationName = new LocationName()
						{
							Id = new Guid("f2d1545b-0ba6-47af-6679-08d7e930c1fb"),
							Name = "ul. Szkolna 17, Białystok"
						}
					}
				}
			});

			#endregion DataSeeding
		}
	}
}