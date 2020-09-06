using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
    public partial class SimplifiedLocationModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Coordinates_CoordinatesId",
                table: "Locations");

            migrationBuilder.DropForeignKey(
                name: "FK_Locations_LocationNames_LocationNameId",
                table: "Locations");

            migrationBuilder.DropTable(
                name: "LocationNames");

            migrationBuilder.DropIndex(
                name: "IX_Locations_LocationNameId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "LocationNameId",
                table: "Locations");

            migrationBuilder.AlterColumn<Guid>(
                name: "CoordinatesId",
                table: "Locations",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Locations",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Coordinates_CoordinatesId",
                table: "Locations",
                column: "CoordinatesId",
                principalTable: "Coordinates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Coordinates_CoordinatesId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Locations");

            migrationBuilder.AlterColumn<Guid>(
                name: "CoordinatesId",
                table: "Locations",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddColumn<Guid>(
                name: "LocationNameId",
                table: "Locations",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "LocationNames",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocationNames", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Locations_LocationNameId",
                table: "Locations",
                column: "LocationNameId");

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Coordinates_CoordinatesId",
                table: "Locations",
                column: "CoordinatesId",
                principalTable: "Coordinates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_LocationNames_LocationNameId",
                table: "Locations",
                column: "LocationNameId",
                principalTable: "LocationNames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
