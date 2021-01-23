using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class AddedParticipantToStop : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserParticipatedRides_Rides_RideId1",
                table: "UserParticipatedRides");

            migrationBuilder.DropIndex(
                name: "IX_UserParticipatedRides_RideId1",
                table: "UserParticipatedRides");

            migrationBuilder.DropColumn(
                name: "RideId1",
                table: "UserParticipatedRides");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Stops");

            migrationBuilder.AddColumn<long>(
                name: "ParticipantId",
                table: "Stops",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<double>(
                name: "Location_Latitude",
                table: "RideRequests",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Location_Longitude",
                table: "RideRequests",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateIndex(
                name: "IX_Stops_ParticipantId",
                table: "Stops",
                column: "ParticipantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stops_Users_ParticipantId",
                table: "Stops",
                column: "ParticipantId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stops_Users_ParticipantId",
                table: "Stops");

            migrationBuilder.DropIndex(
                name: "IX_Stops_ParticipantId",
                table: "Stops");

            migrationBuilder.DropColumn(
                name: "ParticipantId",
                table: "Stops");

            migrationBuilder.DropColumn(
                name: "Location_Latitude",
                table: "RideRequests");

            migrationBuilder.DropColumn(
                name: "Location_Longitude",
                table: "RideRequests");

            migrationBuilder.AddColumn<long>(
                name: "RideId1",
                table: "UserParticipatedRides",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Stops",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_UserParticipatedRides_RideId1",
                table: "UserParticipatedRides",
                column: "RideId1");

            migrationBuilder.AddForeignKey(
                name: "FK_UserParticipatedRides_Rides_RideId1",
                table: "UserParticipatedRides",
                column: "RideId1",
                principalTable: "Rides",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
