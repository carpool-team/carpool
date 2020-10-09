using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
	public partial class AddedGroupTableColumns : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddColumn<Guid>(
				"GroupId",
				"Rides",
				nullable: true);

			migrationBuilder.AddColumn<Guid>(
				"LocationId",
				"Groups",
				nullable: true);

			migrationBuilder.CreateIndex(
				"IX_Rides_GroupId",
				"Rides",
				"GroupId");

			migrationBuilder.CreateIndex(
				"IX_Groups_LocationId",
				"Groups",
				"LocationId");

			migrationBuilder.AddForeignKey(
				"FK_Groups_Locations_LocationId",
				"Groups",
				"LocationId",
				"Locations",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);

			migrationBuilder.AddForeignKey(
				"FK_Rides_Groups_GroupId",
				"Rides",
				"GroupId",
				"Groups",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_Groups_Locations_LocationId",
				"Groups");

			migrationBuilder.DropForeignKey(
				"FK_Rides_Groups_GroupId",
				"Rides");

			migrationBuilder.DropIndex(
				"IX_Rides_GroupId",
				"Rides");

			migrationBuilder.DropIndex(
				"IX_Groups_LocationId",
				"Groups");

			migrationBuilder.DropColumn(
				"GroupId",
				"Rides");

			migrationBuilder.DropColumn(
				"LocationId",
				"Groups");
		}
	}
}