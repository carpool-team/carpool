using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class AddedRideDirectionToRide : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Destination_Latitude",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "Destination_Longitude",
                table: "Rides");

            migrationBuilder.RenameColumn(
                name: "StartingLocation_Longitude",
                table: "Rides",
                newName: "Location_Longitude");

            migrationBuilder.RenameColumn(
                name: "StartingLocation_Latitude",
                table: "Rides",
                newName: "Location_Latitude");

            migrationBuilder.AddColumn<int>(
                name: "RideDirection",
                table: "Rides",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RideDirection",
                table: "Rides");

            migrationBuilder.RenameColumn(
                name: "Location_Longitude",
                table: "Rides",
                newName: "StartingLocation_Longitude");

            migrationBuilder.RenameColumn(
                name: "Location_Latitude",
                table: "Rides",
                newName: "StartingLocation_Latitude");

            migrationBuilder.AddColumn<double>(
                name: "Destination_Latitude",
                table: "Rides",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Destination_Longitude",
                table: "Rides",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
