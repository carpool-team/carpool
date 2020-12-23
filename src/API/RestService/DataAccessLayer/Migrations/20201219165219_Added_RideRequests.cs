using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class Added_RideRequests : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RideRequests",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false),
                    IsAccepted = table.Column<bool>(type: "bit", nullable: false),
                    IsPending = table.Column<bool>(type: "bit", nullable: false),
                    RideId = table.Column<long>(type: "bigint", nullable: false),
                    RequestingUserId = table.Column<long>(type: "bigint", nullable: false),
                    RideOwnerId = table.Column<long>(type: "bigint", nullable: false),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RideRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RideRequests_Rides_RideId",
                        column: x => x.RideId,
                        principalTable: "Rides",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RideRequests_Users_RequestingUserId",
                        column: x => x.RequestingUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RideRequests_Users_RideOwnerId",
                        column: x => x.RideOwnerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_RideRequests_RequestingUserId",
                table: "RideRequests",
                column: "RequestingUserId");

            migrationBuilder.CreateIndex(
                name: "IX_RideRequests_RideId",
                table: "RideRequests",
                column: "RideId");

            migrationBuilder.CreateIndex(
                name: "IX_RideRequests_RideOwnerId",
                table: "RideRequests",
                column: "RideOwnerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RideRequests");
        }
    }
}
