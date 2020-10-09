using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
	public partial class AddedVehicleToUser : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddColumn<Guid>(
				"VehicleId",
				"Users",
				nullable: true);

			migrationBuilder.CreateTable(
				"Vehicle",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					Name = table.Column<string>(nullable: true)
				},
				constraints: table => { table.PrimaryKey("PK_Vehicle", x => x.Id); });

			migrationBuilder.CreateIndex(
				"IX_Users_VehicleId",
				"Users",
				"VehicleId");

			migrationBuilder.AddForeignKey(
				"FK_Users_Vehicle_VehicleId",
				"Users",
				"VehicleId",
				"Vehicle",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_Users_Vehicle_VehicleId",
				"Users");

			migrationBuilder.DropTable(
				"Vehicle");

			migrationBuilder.DropIndex(
				"IX_Users_VehicleId",
				"Users");

			migrationBuilder.DropColumn(
				"VehicleId",
				"Users");
		}
	}
}