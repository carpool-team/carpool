using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
	public partial class ChangedUserParticipatedRideKey : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_UserParticipatedRides_Users_RideId",
				"UserParticipatedRides");

			migrationBuilder.DropForeignKey(
				"FK_UserParticipatedRides_Rides_UserId",
				"UserParticipatedRides");

			migrationBuilder.DropPrimaryKey(
				"PK_UserParticipatedRides",
				"UserParticipatedRides");

			migrationBuilder.DropIndex(
				"IX_UserParticipatedRides_UserId",
				"UserParticipatedRides");

			migrationBuilder.AddPrimaryKey(
				"PK_UserParticipatedRides",
				"UserParticipatedRides",
				new[] {"UserId", "RideId"});

			migrationBuilder.AddForeignKey(
				"FK_UserParticipatedRides_Rides_RideId",
				"UserParticipatedRides",
				"RideId",
				"Rides",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);

			migrationBuilder.AddForeignKey(
				"FK_UserParticipatedRides_Users_UserId",
				"UserParticipatedRides",
				"UserId",
				"Users",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_UserParticipatedRides_Rides_RideId",
				"UserParticipatedRides");

			migrationBuilder.DropForeignKey(
				"FK_UserParticipatedRides_Users_UserId",
				"UserParticipatedRides");

			migrationBuilder.DropPrimaryKey(
				"PK_UserParticipatedRides",
				"UserParticipatedRides");

			migrationBuilder.AddPrimaryKey(
				"PK_UserParticipatedRides",
				"UserParticipatedRides",
				"Id");

			migrationBuilder.CreateIndex(
				"IX_UserParticipatedRides_UserId",
				"UserParticipatedRides",
				"UserId");

			migrationBuilder.AddForeignKey(
				"FK_UserParticipatedRides_Users_RideId",
				"UserParticipatedRides",
				"RideId",
				"Users",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);

			migrationBuilder.AddForeignKey(
				"FK_UserParticipatedRides_Rides_UserId",
				"UserParticipatedRides",
				"UserId",
				"Rides",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);
		}
	}
}