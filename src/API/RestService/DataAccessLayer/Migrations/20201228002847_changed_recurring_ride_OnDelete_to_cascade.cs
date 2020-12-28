using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class changed_recurring_ride_OnDelete_to_cascade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rides_RecurringRides_RecurringRideId",
                table: "Rides");

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_RecurringRides_RecurringRideId",
                table: "Rides",
                column: "RecurringRideId",
                principalTable: "RecurringRides",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rides_RecurringRides_RecurringRideId",
                table: "Rides");

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_RecurringRides_RecurringRideId",
                table: "Rides",
                column: "RecurringRideId",
                principalTable: "RecurringRides",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
