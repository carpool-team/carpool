using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
    public partial class ChangedUserParticipatedRideKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserParticipatedRides_Users_RideId",
                table: "UserParticipatedRides");

            migrationBuilder.DropForeignKey(
                name: "FK_UserParticipatedRides_Rides_UserId",
                table: "UserParticipatedRides");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserParticipatedRides",
                table: "UserParticipatedRides");

            migrationBuilder.DropIndex(
                name: "IX_UserParticipatedRides_UserId",
                table: "UserParticipatedRides");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserParticipatedRides",
                table: "UserParticipatedRides",
                columns: new[] { "UserId", "RideId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserParticipatedRides_Rides_RideId",
                table: "UserParticipatedRides",
                column: "RideId",
                principalTable: "Rides",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserParticipatedRides_Users_UserId",
                table: "UserParticipatedRides",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserParticipatedRides_Rides_RideId",
                table: "UserParticipatedRides");

            migrationBuilder.DropForeignKey(
                name: "FK_UserParticipatedRides_Users_UserId",
                table: "UserParticipatedRides");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserParticipatedRides",
                table: "UserParticipatedRides");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserParticipatedRides",
                table: "UserParticipatedRides",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserParticipatedRides_UserId",
                table: "UserParticipatedRides",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserParticipatedRides_Users_RideId",
                table: "UserParticipatedRides",
                column: "RideId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserParticipatedRides_Rides_UserId",
                table: "UserParticipatedRides",
                column: "UserId",
                principalTable: "Rides",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
