using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
	public partial class AddedDateToRideRequest : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddColumn<double>(
				"Price",
				"Rides",
				nullable: false,
				defaultValue: 0.0);

			migrationBuilder.AddColumn<DateTime>(
				"Date",
				"RideRequests",
				nullable: false,
				defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropColumn(
				"Price",
				"Rides");

			migrationBuilder.DropColumn(
				"Date",
				"RideRequests");
		}
	}
}