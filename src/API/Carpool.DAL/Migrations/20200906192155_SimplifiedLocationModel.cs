using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
	public partial class SimplifiedLocationModel : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_Locations_Coordinates_CoordinatesId",
				"Locations");

			migrationBuilder.DropForeignKey(
				"FK_Locations_LocationNames_LocationNameId",
				"Locations");

			migrationBuilder.DropTable(
				"LocationNames");

			migrationBuilder.DropIndex(
				"IX_Locations_LocationNameId",
				"Locations");

			migrationBuilder.DropColumn(
				"LocationNameId",
				"Locations");

			migrationBuilder.AlterColumn<Guid>(
				"CoordinatesId",
				"Locations",
				nullable: false,
				oldClrType: typeof(Guid),
				oldType: "uniqueidentifier",
				oldNullable: true);

			migrationBuilder.AddColumn<string>(
				"Name",
				"Locations",
				nullable: false,
				defaultValue: "");

			migrationBuilder.AddForeignKey(
				"FK_Locations_Coordinates_CoordinatesId",
				"Locations",
				"CoordinatesId",
				"Coordinates",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_Locations_Coordinates_CoordinatesId",
				"Locations");

			migrationBuilder.DropColumn(
				"Name",
				"Locations");

			migrationBuilder.AlterColumn<Guid>(
				"CoordinatesId",
				"Locations",
				"uniqueidentifier",
				nullable: true,
				oldClrType: typeof(Guid));

			migrationBuilder.AddColumn<Guid>(
				"LocationNameId",
				"Locations",
				"uniqueidentifier",
				nullable: true);

			migrationBuilder.CreateTable(
				"LocationNames",
				table => new
				{
					Id = table.Column<Guid>("uniqueidentifier", nullable: false),
					Name = table.Column<string>("nvarchar(max)", nullable: true)
				},
				constraints: table => { table.PrimaryKey("PK_LocationNames", x => x.Id); });

			migrationBuilder.CreateIndex(
				"IX_Locations_LocationNameId",
				"Locations",
				"LocationNameId");

			migrationBuilder.AddForeignKey(
				"FK_Locations_Coordinates_CoordinatesId",
				"Locations",
				"CoordinatesId",
				"Coordinates",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);

			migrationBuilder.AddForeignKey(
				"FK_Locations_LocationNames_LocationNameId",
				"Locations",
				"LocationNameId",
				"LocationNames",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);
		}
	}
}