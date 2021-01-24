using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class AddedSoftDeleteToGroups : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupInvites_Groups_GroupId",
                table: "GroupInvites");

            migrationBuilder.DropForeignKey(
                name: "FK_UserParticipatedRides_Rides_RideId",
                table: "UserParticipatedRides");

            migrationBuilder.AddColumn<bool>(
                name: "IsSoftDeleted",
                table: "Groups",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupInvites_Groups_GroupId",
                table: "GroupInvites",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupInvites_Groups_GroupId",
                table: "GroupInvites");

            migrationBuilder.DropColumn(
                name: "IsSoftDeleted",
                table: "Groups");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupInvites_Groups_GroupId",
                table: "GroupInvites",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserParticipatedRides_Rides_RideId",
                table: "UserParticipatedRides",
                column: "RideId",
                principalTable: "Rides",
                principalColumn: "Id");
        }
    }
}
