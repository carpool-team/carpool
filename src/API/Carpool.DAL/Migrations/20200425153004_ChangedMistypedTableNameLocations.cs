using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
    public partial class ChangedMistypedTableNameLocations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Location_Coordinates_CoordinatesId",
                table: "Location");

            migrationBuilder.DropForeignKey(
                name: "FK_Location_LocationNames_LocationNameId",
                table: "Location");

            migrationBuilder.DropForeignKey(
                name: "FK_Location_Users_UserId",
                table: "Location");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Location",
                table: "Location");

            migrationBuilder.RenameTable(
                name: "Location",
                newName: "Locations");

            migrationBuilder.RenameIndex(
                name: "IX_Location_UserId",
                table: "Locations",
                newName: "IX_Locations_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Location_LocationNameId",
                table: "Locations",
                newName: "IX_Locations_LocationNameId");

            migrationBuilder.RenameIndex(
                name: "IX_Location_CoordinatesId",
                table: "Locations",
                newName: "IX_Locations_CoordinatesId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Locations",
                table: "Locations",
                column: "Id");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Users_UserId",
                table: "Locations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Coordinates_CoordinatesId",
                table: "Locations");

            migrationBuilder.DropForeignKey(
                name: "FK_Locations_LocationNames_LocationNameId",
                table: "Locations");

            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Users_UserId",
                table: "Locations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Locations",
                table: "Locations");

            migrationBuilder.RenameTable(
                name: "Locations",
                newName: "Location");

            migrationBuilder.RenameIndex(
                name: "IX_Locations_UserId",
                table: "Location",
                newName: "IX_Location_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Locations_LocationNameId",
                table: "Location",
                newName: "IX_Location_LocationNameId");

            migrationBuilder.RenameIndex(
                name: "IX_Locations_CoordinatesId",
                table: "Location",
                newName: "IX_Location_CoordinatesId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Location",
                table: "Location",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Location_Coordinates_CoordinatesId",
                table: "Location",
                column: "CoordinatesId",
                principalTable: "Coordinates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Location_LocationNames_LocationNameId",
                table: "Location",
                column: "LocationNameId",
                principalTable: "LocationNames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Location_Users_UserId",
                table: "Location",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
