using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
    public partial class AddedGroupTableColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "GroupId",
                table: "Rides",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "LocationId",
                table: "Groups",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rides_GroupId",
                table: "Rides",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Groups_LocationId",
                table: "Groups",
                column: "LocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Locations_LocationId",
                table: "Groups",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_Groups_GroupId",
                table: "Rides",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Locations_LocationId",
                table: "Groups");

            migrationBuilder.DropForeignKey(
                name: "FK_Rides_Groups_GroupId",
                table: "Rides");

            migrationBuilder.DropIndex(
                name: "IX_Rides_GroupId",
                table: "Rides");

            migrationBuilder.DropIndex(
                name: "IX_Groups_LocationId",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "LocationId",
                table: "Groups");
        }
    }
}
