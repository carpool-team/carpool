using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
	public partial class CompanyIdIsNowNullable : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_Groups_Locations_LocationId",
				"Groups");

			migrationBuilder.DropForeignKey(
				"FK_Ratings_Users_UserId",
				"Ratings");

			migrationBuilder.DropForeignKey(
				"FK_RideRequests_Users_RequesterId",
				"RideRequests");

			migrationBuilder.DropForeignKey(
				"FK_Rides_Users_OwnerId",
				"Rides");

			migrationBuilder.DropForeignKey(
				"FK_UserGroups_Groups_GroupId",
				"UserGroups");

			migrationBuilder.DropForeignKey(
				"FK_Users_Companies_CompanyId",
				"Users");

			migrationBuilder.DropForeignKey(
				"FK_Users_Vehicles_VehicleId",
				"Users");

			migrationBuilder.DropIndex(
				"IX_Groups_OwnerId",
				"Groups");

			migrationBuilder.AlterColumn<int>(
				"CompanyId",
				"Users",
				nullable: true,
				oldClrType: typeof(int),
				oldType: "int");

			migrationBuilder.CreateIndex(
				"IX_Groups_OwnerId",
				"Groups",
				"OwnerId");

			migrationBuilder.AddForeignKey(
				"FK_Groups_Locations_LocationId",
				"Groups",
				"LocationId",
				"Locations",
				principalColumn: "Id");

			migrationBuilder.AddForeignKey(
				"FK_Ratings_Users_UserId",
				"Ratings",
				"UserId",
				"Users",
				principalColumn: "Id");

			migrationBuilder.AddForeignKey(
				"FK_RideRequests_Users_RequesterId",
				"RideRequests",
				"RequesterId",
				"Users",
				principalColumn: "Id");

			migrationBuilder.AddForeignKey(
				"FK_Rides_Users_OwnerId",
				"Rides",
				"OwnerId",
				"Users",
				principalColumn: "Id");

			migrationBuilder.AddForeignKey(
				"FK_UserGroups_Groups_GroupId",
				"UserGroups",
				"GroupId",
				"Groups",
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

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_Groups_Locations_LocationId",
				"Groups");

			migrationBuilder.DropForeignKey(
				"FK_Ratings_Users_UserId",
				"Ratings");

			migrationBuilder.DropForeignKey(
				"FK_RideRequests_Users_RequesterId",
				"RideRequests");

			migrationBuilder.DropForeignKey(
				"FK_Rides_Users_OwnerId",
				"Rides");

			migrationBuilder.DropForeignKey(
				"FK_UserGroups_Groups_GroupId",
				"UserGroups");

			migrationBuilder.DropForeignKey(
				"FK_Users_Companies_CompanyId",
				"Users");

			migrationBuilder.DropForeignKey(
				"FK_Users_Vehicles_VehicleId",
				"Users");

			migrationBuilder.DropIndex(
				"IX_Groups_OwnerId",
				"Groups");

			migrationBuilder.AlterColumn<int>(
				"CompanyId",
				"Users",
				"int",
				nullable: false,
				oldClrType: typeof(int),
				oldNullable: true);

			migrationBuilder.CreateIndex(
				"IX_Groups_OwnerId",
				"Groups",
				"OwnerId",
				unique: true);

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
				"FK_RideRequests_Users_RequesterId",
				"RideRequests",
				"RequesterId",
				"Users",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);

			migrationBuilder.AddForeignKey(
				"FK_Rides_Users_OwnerId",
				"Rides",
				"OwnerId",
				"Users",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);

			migrationBuilder.AddForeignKey(
				"FK_UserGroups_Groups_GroupId",
				"UserGroups",
				"GroupId",
				"Groups",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);

			migrationBuilder.AddForeignKey(
				"FK_Users_Companies_CompanyId",
				"Users",
				"CompanyId",
				"Companies",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);

			migrationBuilder.AddForeignKey(
				"FK_Users_Vehicles_VehicleId",
				"Users",
				"VehicleId",
				"Vehicles",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);
		}
	}
}