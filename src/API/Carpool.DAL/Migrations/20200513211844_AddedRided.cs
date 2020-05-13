using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
    public partial class AddedRided : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RideRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DestinationId = table.Column<Guid>(nullable: true),
                    StartingLocationId = table.Column<Guid>(nullable: true),
                    RequesterId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RideRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RideRequests_Locations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RideRequests_Users_RequesterId",
                        column: x => x.RequesterId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RideRequests_Locations_StartingLocationId",
                        column: x => x.StartingLocationId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Rides",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DestinationId = table.Column<Guid>(nullable: true),
                    StartingLocationId = table.Column<Guid>(nullable: true),
                    OwnerId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rides", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rides_Locations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Rides_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Rides_Locations_StartingLocationId",
                        column: x => x.StartingLocationId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Stops",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: true),
                    CoordinatesId = table.Column<Guid>(nullable: true),
                    RideId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stops", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stops_Coordinates_CoordinatesId",
                        column: x => x.CoordinatesId,
                        principalTable: "Coordinates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Stops_Rides_RideId",
                        column: x => x.RideId,
                        principalTable: "Rides",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Stops_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserParticipatedRides",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    RideId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserParticipatedRides", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserParticipatedRides_Users_RideId",
                        column: x => x.RideId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserParticipatedRides_Rides_UserId",
                        column: x => x.UserId,
                        principalTable: "Rides",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RideRequests_DestinationId",
                table: "RideRequests",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_RideRequests_RequesterId",
                table: "RideRequests",
                column: "RequesterId");

            migrationBuilder.CreateIndex(
                name: "IX_RideRequests_StartingLocationId",
                table: "RideRequests",
                column: "StartingLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Rides_DestinationId",
                table: "Rides",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Rides_OwnerId",
                table: "Rides",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Rides_StartingLocationId",
                table: "Rides",
                column: "StartingLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Stops_CoordinatesId",
                table: "Stops",
                column: "CoordinatesId");

            migrationBuilder.CreateIndex(
                name: "IX_Stops_RideId",
                table: "Stops",
                column: "RideId");

            migrationBuilder.CreateIndex(
                name: "IX_Stops_UserId",
                table: "Stops",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserParticipatedRides_RideId",
                table: "UserParticipatedRides",
                column: "RideId");

            migrationBuilder.CreateIndex(
                name: "IX_UserParticipatedRides_UserId",
                table: "UserParticipatedRides",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RideRequests");

            migrationBuilder.DropTable(
                name: "Stops");

            migrationBuilder.DropTable(
                name: "UserParticipatedRides");

            migrationBuilder.DropTable(
                name: "Rides");
        }
    }
}
