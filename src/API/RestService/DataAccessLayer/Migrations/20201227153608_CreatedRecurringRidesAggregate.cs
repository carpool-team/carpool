using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class CreatedRecurringRidesAggregate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "RecurringRideId",
                table: "Rides",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "RecurringRides",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecurringRides", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rides_RecurringRideId",
                table: "Rides",
                column: "RecurringRideId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rides_RecurringRides_RecurringRideId",
                table: "Rides",
                column: "RecurringRideId",
                principalTable: "RecurringRides",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rides_RecurringRides_RecurringRideId",
                table: "Rides");

            migrationBuilder.DropTable(
                name: "RecurringRides");

            migrationBuilder.DropIndex(
                name: "IX_Rides_RecurringRideId",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "RecurringRideId",
                table: "Rides");
        }
    }
}
