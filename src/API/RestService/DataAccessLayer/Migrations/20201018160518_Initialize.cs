using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
	public partial class Initialize : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable("Companies",
				table => new
				{
					Id = table.Column<int>(nullable: false)
						.Annotation("SqlServer:Identity", "1, 1"),
					Name = table.Column<string>(nullable: true)
				},
				constraints: table => { table.PrimaryKey("PK_Companies", x => x.Id); });

			migrationBuilder.CreateTable("Vehicles",
				table => new {Id = table.Column<Guid>(nullable: false), Name = table.Column<string>(nullable: true)},
				constraints: table => { table.PrimaryKey("PK_Vehicles", x => x.Id); });

			migrationBuilder.CreateTable("Users",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					UserName = table.Column<string>(nullable: true),
					NormalizedUserName = table.Column<string>(nullable: true),
					Email = table.Column<string>(nullable: true),
					NormalizedEmail = table.Column<string>(nullable: true),
					EmailConfirmed = table.Column<bool>(nullable: false),
					PasswordHash = table.Column<string>(nullable: true),
					SecurityStamp = table.Column<string>(nullable: true),
					ConcurrencyStamp = table.Column<string>(nullable: true),
					PhoneNumber = table.Column<string>(nullable: true),
					PhoneNumberConfirmed = table.Column<bool>(nullable: false),
					TwoFactorEnabled = table.Column<bool>(nullable: false),
					LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
					LockoutEnabled = table.Column<bool>(nullable: false),
					AccessFailedCount = table.Column<int>(nullable: false),
					FirstName = table.Column<string>(nullable: true),
					LastName = table.Column<string>(nullable: true),
					VehicleId = table.Column<Guid>(nullable: true),
					CompanyId = table.Column<int>(nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Users", x => x.Id);
					table.ForeignKey("FK_Users_Companies_CompanyId",
						x => x.CompanyId,
						"Companies",
						"Id",
						onDelete: ReferentialAction.Cascade);

					table.ForeignKey("FK_Users_Vehicles_VehicleId",
						x => x.VehicleId,
						"Vehicles",
						"Id",
						onDelete: ReferentialAction.Restrict);
				});

			migrationBuilder.CreateTable("GroupInvites",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					IsPending = table.Column<bool>(nullable: false),
					GroupId = table.Column<Guid>(nullable: false),
					InvitedUserId = table.Column<Guid>(nullable: false),
					InviterId = table.Column<Guid>(nullable: false),
					IsAccepted = table.Column<bool>(nullable: false),
					DateAdded = table.Column<DateTime>(nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_GroupInvites", x => x.Id);
					table.ForeignKey("FK_GroupInvites_Users_InvitedUserId",
						x => x.InvitedUserId,
						"Users",
						"Id");

					table.ForeignKey("FK_GroupInvites_Users_InviterId",
						x => x.InviterId,
						"Users",
						"Id");
				});

			migrationBuilder.CreateTable("Locations",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					Longitude = table.Column<double>(nullable: false),
					Latitude = table.Column<double>(nullable: false),
					Name = table.Column<string>(nullable: true),
					UserId = table.Column<Guid>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Locations", x => x.Id);
					table.ForeignKey("FK_Locations_Users_UserId",
						x => x.UserId,
						"Users",
						"Id",
						onDelete: ReferentialAction.Restrict);
				});

			migrationBuilder.CreateTable("Ratings",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					UserId = table.Column<Guid>(nullable: false),
					Value = table.Column<byte>(nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Ratings", x => x.Id);
					table.ForeignKey("FK_Ratings_Users_UserId",
						x => x.UserId,
						"Users",
						"Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateTable("Groups",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					LocationId = table.Column<Guid>(nullable: false),
					Name = table.Column<string>(nullable: false),
					Code = table.Column<string>(nullable: true),
					OwnerId = table.Column<Guid>(nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Groups", x => x.Id);
					table.ForeignKey("FK_Groups_Locations_LocationId",
						x => x.LocationId,
						"Locations",
						"Id",
						onDelete: ReferentialAction.Cascade);

					table.ForeignKey("FK_Groups_Users_OwnerId",
						x => x.OwnerId,
						"Users",
						"Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateTable("RideRequests",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					DestinationId = table.Column<Guid>(nullable: false),
					StartingLocationId = table.Column<Guid>(nullable: false),
					RequesterId = table.Column<Guid>(nullable: false),
					Date = table.Column<DateTime>(nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_RideRequests", x => x.Id);
					table.ForeignKey("FK_RideRequests_Locations_DestinationId",
						x => x.DestinationId,
						"Locations",
						"Id");

					table.ForeignKey("FK_RideRequests_Users_RequesterId",
						x => x.RequesterId,
						"Users",
						"Id",
						onDelete: ReferentialAction.Cascade);

					table.ForeignKey("FK_RideRequests_Locations_StartingLocationId",
						x => x.StartingLocationId,
						"Locations",
						"Id");
				});

			migrationBuilder.CreateTable("Rides",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					DestinationId = table.Column<Guid>(nullable: false),
					StartingLocationId = table.Column<Guid>(nullable: false),
					OwnerId = table.Column<Guid>(nullable: false),
					GroupId = table.Column<Guid>(nullable: false),
					Date = table.Column<DateTime>(nullable: false),
					Price = table.Column<double>(nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Rides", x => x.Id);
					table.ForeignKey("FK_Rides_Locations_DestinationId",
						x => x.DestinationId,
						"Locations",
						"Id");

					table.ForeignKey("FK_Rides_Groups_GroupId",
						x => x.GroupId,
						"Groups",
						"Id");

					table.ForeignKey("FK_Rides_Users_OwnerId",
						x => x.OwnerId,
						"Users",
						"Id",
						onDelete: ReferentialAction.Cascade);

					table.ForeignKey("FK_Rides_Locations_StartingLocationId",
						x => x.StartingLocationId,
						"Locations",
						"Id");
				});

			migrationBuilder.CreateTable("UserGroups",
				table => new
				{
					UserId = table.Column<Guid>(nullable: false), GroupId = table.Column<Guid>(nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_UserGroups", x => new {x.GroupId, x.UserId});
					table.ForeignKey("FK_UserGroups_Groups_GroupId",
						x => x.GroupId,
						"Groups",
						"Id",
						onDelete: ReferentialAction.Restrict);

					table.ForeignKey("FK_UserGroups_Users_UserId",
						x => x.UserId,
						"Users",
						"Id");
				});

			migrationBuilder.CreateTable("Stops",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					UserId = table.Column<Guid>(nullable: false),
					LocationId = table.Column<Guid>(nullable: false),
					RideId = table.Column<Guid>(nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Stops", x => x.Id);
					table.ForeignKey("FK_Stops_Rides_RideId",
						x => x.RideId,
						"Rides",
						"Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateTable("UserParticipatedRides",
				table => new
				{
					UserId = table.Column<Guid>(nullable: false), RideId = table.Column<Guid>(nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_UserParticipatedRides", x => new {x.RideId, x.UserId});
					table.ForeignKey("FK_UserParticipatedRides_Rides_RideId",
						x => x.RideId,
						"Rides",
						"Id");

					table.ForeignKey("FK_UserParticipatedRides_Users_UserId",
						x => x.UserId,
						"Users",
						"Id");
				});

			migrationBuilder.CreateIndex("IX_GroupInvites_InvitedUserId",
				"GroupInvites",
				"InvitedUserId");

			migrationBuilder.CreateIndex("IX_GroupInvites_InviterId",
				"GroupInvites",
				"InviterId");

			migrationBuilder.CreateIndex("IX_Groups_LocationId",
				"Groups",
				"LocationId");

			migrationBuilder.CreateIndex("IX_Groups_OwnerId",
				"Groups",
				"OwnerId",
				unique: true);

			migrationBuilder.CreateIndex("IX_Locations_UserId",
				"Locations",
				"UserId");

			migrationBuilder.CreateIndex("IX_Ratings_UserId",
				"Ratings",
				"UserId");

			migrationBuilder.CreateIndex("IX_RideRequests_DestinationId",
				"RideRequests",
				"DestinationId");

			migrationBuilder.CreateIndex("IX_RideRequests_RequesterId",
				"RideRequests",
				"RequesterId");

			migrationBuilder.CreateIndex("IX_RideRequests_StartingLocationId",
				"RideRequests",
				"StartingLocationId");

			migrationBuilder.CreateIndex("IX_Rides_DestinationId",
				"Rides",
				"DestinationId");

			migrationBuilder.CreateIndex("IX_Rides_GroupId",
				"Rides",
				"GroupId");

			migrationBuilder.CreateIndex("IX_Rides_OwnerId",
				"Rides",
				"OwnerId");

			migrationBuilder.CreateIndex("IX_Rides_StartingLocationId",
				"Rides",
				"StartingLocationId");

			migrationBuilder.CreateIndex("IX_Stops_RideId",
				"Stops",
				"RideId");

			migrationBuilder.CreateIndex("IX_UserGroups_UserId",
				"UserGroups",
				"UserId");

			migrationBuilder.CreateIndex("IX_UserParticipatedRides_UserId",
				"UserParticipatedRides",
				"UserId");

			migrationBuilder.CreateIndex("IX_Users_CompanyId",
				"Users",
				"CompanyId");

			migrationBuilder.CreateIndex("IX_Users_VehicleId",
				"Users",
				"VehicleId",
				unique: true,
				filter: "[VehicleId] IS NOT NULL");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable("GroupInvites");

			migrationBuilder.DropTable("Ratings");

			migrationBuilder.DropTable("RideRequests");

			migrationBuilder.DropTable("Stops");

			migrationBuilder.DropTable("UserGroups");

			migrationBuilder.DropTable("UserParticipatedRides");

			migrationBuilder.DropTable("Rides");

			migrationBuilder.DropTable("Groups");

			migrationBuilder.DropTable("Locations");

			migrationBuilder.DropTable("Users");

			migrationBuilder.DropTable("Companies");

			migrationBuilder.DropTable("Vehicles");
		}
	}
}