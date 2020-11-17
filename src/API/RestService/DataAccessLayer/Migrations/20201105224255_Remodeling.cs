using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
	public partial class Remodeling : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_GroupInvites_Users_InviterId",
				"GroupInvites");

			migrationBuilder.DropForeignKey(
				"FK_Groups_Locations_LocationId",
				"Groups");

			migrationBuilder.DropForeignKey(
				"FK_Locations_Users_UserId",
				"Locations");

			migrationBuilder.DropForeignKey(
				"FK_Ratings_Users_UserId",
				"Ratings");

			migrationBuilder.DropForeignKey(
				"FK_Users_Companies_CompanyId",
				"Users");

			migrationBuilder.DropForeignKey(
				"FK_Users_Vehicles_VehicleId",
				"Users");

			migrationBuilder.DropTable(
				"Companies");

			migrationBuilder.DropTable(
				"RideRequests");

			migrationBuilder.DropIndex(
				"IX_Users_CompanyId",
				"Users");

			migrationBuilder.DropIndex(
				"IX_Locations_UserId",
				"Locations");

			migrationBuilder.DropIndex(
				"IX_GroupInvites_InviterId",
				"GroupInvites");

			migrationBuilder.DropColumn(
				"CompanyId",
				"Users");

			migrationBuilder.DropColumn(
				"UserId",
				"Locations");

			migrationBuilder.DropColumn(
				"InviterId",
				"GroupInvites");

			migrationBuilder.AddColumn<Guid>(
				"RideId1",
				"UserParticipatedRides",
				nullable: true);

			migrationBuilder.AddColumn<Guid>(
				"InvitingUserId",
				"GroupInvites",
				nullable: false,
				defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

			migrationBuilder.CreateIndex(
				"IX_UserParticipatedRides_RideId1",
				"UserParticipatedRides",
				"RideId1");

			migrationBuilder.CreateIndex(
				"IX_Stops_LocationId",
				"Stops",
				"LocationId");

			migrationBuilder.CreateIndex(
				"IX_GroupInvites_InvitingUserId",
				"GroupInvites",
				"InvitingUserId");

			migrationBuilder.AddForeignKey(
				"FK_GroupInvites_Users_InvitingUserId",
				"GroupInvites",
				"InvitingUserId",
				"Users",
				principalColumn: "Id");

			migrationBuilder.AddForeignKey(
				"FK_Groups_Locations_LocationId",
				"Groups",
				"LocationId",
				"Locations",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);

			migrationBuilder.AddForeignKey(
				"FK_Ratings_Users_UserId",
				"Ratings",
				"UserId",
				"Users",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);

			migrationBuilder.AddForeignKey(
				"FK_Stops_Locations_LocationId",
				"Stops",
				"LocationId",
				"Locations",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);

			migrationBuilder.AddForeignKey(
				"FK_UserParticipatedRides_Rides_RideId1",
				"UserParticipatedRides",
				"RideId1",
				"Rides",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);

			migrationBuilder.AddForeignKey(
				"FK_Users_Vehicles_VehicleId",
				"Users",
				"VehicleId",
				"Vehicles",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_GroupInvites_Users_InvitingUserId",
				"GroupInvites");

			migrationBuilder.DropForeignKey(
				"FK_Groups_Locations_LocationId",
				"Groups");

			migrationBuilder.DropForeignKey(
				"FK_Ratings_Users_UserId",
				"Ratings");

			migrationBuilder.DropForeignKey(
				"FK_Stops_Locations_LocationId",
				"Stops");

			migrationBuilder.DropForeignKey(
				"FK_UserParticipatedRides_Rides_RideId1",
				"UserParticipatedRides");

			migrationBuilder.DropForeignKey(
				"FK_Users_Vehicles_VehicleId",
				"Users");

			migrationBuilder.DropIndex(
				"IX_UserParticipatedRides_RideId1",
				"UserParticipatedRides");

			migrationBuilder.DropIndex(
				"IX_Stops_LocationId",
				"Stops");

			migrationBuilder.DropIndex(
				"IX_GroupInvites_InvitingUserId",
				"GroupInvites");

			migrationBuilder.DropColumn(
				"RideId1",
				"UserParticipatedRides");

			migrationBuilder.DropColumn(
				"InvitingUserId",
				"GroupInvites");

			migrationBuilder.AddColumn<int>(
				"CompanyId",
				"Users",
				"int",
				nullable: true);

			migrationBuilder.AddColumn<Guid>(
				"UserId",
				"Locations",
				"uniqueidentifier",
				nullable: true);

			migrationBuilder.AddColumn<Guid>(
				"InviterId",
				"GroupInvites",
				"uniqueidentifier",
				nullable: false,
				defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

			migrationBuilder.CreateTable(
				"Companies",
				table => new
				{
					Id = table.Column<int>("int", nullable: false)
					          .Annotation("SqlServer:Identity", "1, 1"),
					Name = table.Column<string>("nvarchar(max)", nullable: true)
				},
				constraints: table => { table.PrimaryKey("PK_Companies", x => x.Id); });

			migrationBuilder.CreateTable(
				"RideRequests",
				table => new
				{
					Id = table.Column<Guid>("uniqueidentifier", nullable: false),
					Date = table.Column<DateTime>("datetime2", nullable: false),
					DestinationId = table.Column<Guid>("uniqueidentifier", nullable: false),
					RequesterId = table.Column<Guid>("uniqueidentifier", nullable: false),
					StartingLocationId = table.Column<Guid>("uniqueidentifier", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_RideRequests", x => x.Id);
					table.ForeignKey(
						"FK_RideRequests_Locations_DestinationId",
						x => x.DestinationId,
						"Locations",
						"Id");

					table.ForeignKey(
						"FK_RideRequests_Users_RequesterId",
						x => x.RequesterId,
						"Users",
						"Id");

					table.ForeignKey(
						"FK_RideRequests_Locations_StartingLocationId",
						x => x.StartingLocationId,
						"Locations",
						"Id");
				});

			migrationBuilder.CreateIndex(
				"IX_Users_CompanyId",
				"Users",
				"CompanyId");

			migrationBuilder.CreateIndex(
				"IX_Locations_UserId",
				"Locations",
				"UserId");

			migrationBuilder.CreateIndex(
				"IX_GroupInvites_InviterId",
				"GroupInvites",
				"InviterId");

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

			migrationBuilder.AddForeignKey(
				"FK_GroupInvites_Users_InviterId",
				"GroupInvites",
				"InviterId",
				"Users",
				principalColumn: "Id");

			migrationBuilder.AddForeignKey(
				"FK_Groups_Locations_LocationId",
				"Groups",
				"LocationId",
				"Locations",
				principalColumn: "Id");

			migrationBuilder.AddForeignKey(
				"FK_Locations_Users_UserId",
				"Locations",
				"UserId",
				"Users",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);

			migrationBuilder.AddForeignKey(
				"FK_Ratings_Users_UserId",
				"Ratings",
				"UserId",
				"Users",
				principalColumn: "Id");

			migrationBuilder.AddForeignKey(
				"FK_Users_Companies_CompanyId",
				"Users",
				"CompanyId",
				"Companies",
				principalColumn: "Id");

			migrationBuilder.AddForeignKey(
				"FK_Users_Vehicles_VehicleId",
				"Users",
				"VehicleId",
				"Vehicles",
				principalColumn: "Id");
		}
	}
}