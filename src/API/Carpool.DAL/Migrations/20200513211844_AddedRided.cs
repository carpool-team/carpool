using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
	public partial class AddedRided : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
				"RideRequests",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					DestinationId = table.Column<Guid>(nullable: true),
					StartingLocationId = table.Column<Guid>(nullable: true),
					RequesterId = table.Column<Guid>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_RideRequests", x => x.Id);
					table.ForeignKey(
						"FK_RideRequests_Locations_DestinationId",
						x => x.DestinationId,
						"Locations",
						"Id",
						onDelete: ReferentialAction.Restrict);

					table.ForeignKey(
						"FK_RideRequests_Users_RequesterId",
						x => x.RequesterId,
						"Users",
						"Id",
						onDelete: ReferentialAction.Restrict);

					table.ForeignKey(
						"FK_RideRequests_Locations_StartingLocationId",
						x => x.StartingLocationId,
						"Locations",
						"Id",
						onDelete: ReferentialAction.Restrict);
				});

			migrationBuilder.CreateTable(
				"Rides",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					DestinationId = table.Column<Guid>(nullable: true),
					StartingLocationId = table.Column<Guid>(nullable: true),
					OwnerId = table.Column<Guid>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Rides", x => x.Id);
					table.ForeignKey(
						"FK_Rides_Locations_DestinationId",
						x => x.DestinationId,
						"Locations",
						"Id",
						onDelete: ReferentialAction.Restrict);

					table.ForeignKey(
						"FK_Rides_Users_OwnerId",
						x => x.OwnerId,
						"Users",
						"Id",
						onDelete: ReferentialAction.Restrict);

					table.ForeignKey(
						"FK_Rides_Locations_StartingLocationId",
						x => x.StartingLocationId,
						"Locations",
						"Id",
						onDelete: ReferentialAction.Restrict);
				});

			migrationBuilder.CreateTable(
				"Stops",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					UserId = table.Column<Guid>(nullable: true),
					CoordinatesId = table.Column<Guid>(nullable: true),
					RideId = table.Column<Guid>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Stops", x => x.Id);
					table.ForeignKey(
						"FK_Stops_Coordinates_CoordinatesId",
						x => x.CoordinatesId,
						"Coordinates",
						"Id",
						onDelete: ReferentialAction.Restrict);

					table.ForeignKey(
						"FK_Stops_Rides_RideId",
						x => x.RideId,
						"Rides",
						"Id",
						onDelete: ReferentialAction.Restrict);

					table.ForeignKey(
						"FK_Stops_Users_UserId",
						x => x.UserId,
						"Users",
						"Id",
						onDelete: ReferentialAction.Restrict);
				});

			migrationBuilder.CreateTable(
				"UserParticipatedRides",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					UserId = table.Column<Guid>(nullable: false),
					RideId = table.Column<Guid>(nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_UserParticipatedRides", x => x.Id);
					table.ForeignKey(
						"FK_UserParticipatedRides_Users_RideId",
						x => x.RideId,
						"Users",
						"Id",
						onDelete: ReferentialAction.Cascade);

					table.ForeignKey(
						"FK_UserParticipatedRides_Rides_UserId",
						x => x.UserId,
						"Rides",
						"Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateIndex(
				"IX_RideRequests_DestinationId",
				"RideRequests",
				"DestinationId");

			migrationBuilder.CreateIndex(
				"IX_RideRequests_RequesterId",
				"RideRequests",
				"RequesterId");

			migrationBuilder.CreateIndex(
				"IX_RideRequests_StartingLocationId",
				"RideRequests",
				"StartingLocationId");

			migrationBuilder.CreateIndex(
				"IX_Rides_DestinationId",
				"Rides",
				"DestinationId");

			migrationBuilder.CreateIndex(
				"IX_Rides_OwnerId",
				"Rides",
				"OwnerId");

			migrationBuilder.CreateIndex(
				"IX_Rides_StartingLocationId",
				"Rides",
				"StartingLocationId");

			migrationBuilder.CreateIndex(
				"IX_Stops_CoordinatesId",
				"Stops",
				"CoordinatesId");

			migrationBuilder.CreateIndex(
				"IX_Stops_RideId",
				"Stops",
				"RideId");

			migrationBuilder.CreateIndex(
				"IX_Stops_UserId",
				"Stops",
				"UserId");

			migrationBuilder.CreateIndex(
				"IX_UserParticipatedRides_RideId",
				"UserParticipatedRides",
				"RideId");

			migrationBuilder.CreateIndex(
				"IX_UserParticipatedRides_UserId",
				"UserParticipatedRides",
				"UserId");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				"RideRequests");

			migrationBuilder.DropTable(
				"Stops");

			migrationBuilder.DropTable(
				"UserParticipatedRides");

			migrationBuilder.DropTable(
				"Rides");
		}
	}
}