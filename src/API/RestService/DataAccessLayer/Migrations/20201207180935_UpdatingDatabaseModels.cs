using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class UpdatingDatabaseModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupInvites_Users_InvitedUserId",
                table: "GroupInvites");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupInvites_Users_InvitingUserId",
                table: "GroupInvites");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Users_UserId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_UserGroups_Users_UserId",
                table: "UserGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_UserParticipatedRides_Users_UserId",
                table: "UserParticipatedRides");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Users_UserId",
                table: "Vehicles");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Vehicles",
                newName: "AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_UserId",
                table: "Vehicles",
                newName: "IX_Vehicles_AppUserId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserParticipatedRides",
                newName: "AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserParticipatedRides_UserId",
                table: "UserParticipatedRides",
                newName: "IX_UserParticipatedRides_AppUserId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserGroups",
                newName: "AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserGroups_UserId",
                table: "UserGroups",
                newName: "IX_UserGroups_AppUserId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Ratings",
                newName: "AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Ratings_UserId",
                table: "Ratings",
                newName: "IX_Ratings_AppUserId");

            migrationBuilder.RenameColumn(
                name: "InvitingUserId",
                table: "GroupInvites",
                newName: "InvitingAppUserId");

            migrationBuilder.RenameColumn(
                name: "InvitedUserId",
                table: "GroupInvites",
                newName: "InvitedAppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_GroupInvites_InvitingUserId",
                table: "GroupInvites",
                newName: "IX_GroupInvites_InvitingAppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_GroupInvites_InvitedUserId",
                table: "GroupInvites",
                newName: "IX_GroupInvites_InvitedAppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupInvites_Users_InvitedAppUserId",
                table: "GroupInvites",
                column: "InvitedAppUserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupInvites_Users_InvitingAppUserId",
                table: "GroupInvites",
                column: "InvitingAppUserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Users_AppUserId",
                table: "Ratings",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroups_Users_AppUserId",
                table: "UserGroups",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserParticipatedRides_Users_AppUserId",
                table: "UserParticipatedRides",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Users_AppUserId",
                table: "Vehicles",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupInvites_Users_InvitedAppUserId",
                table: "GroupInvites");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupInvites_Users_InvitingAppUserId",
                table: "GroupInvites");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Users_AppUserId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_UserGroups_Users_AppUserId",
                table: "UserGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_UserParticipatedRides_Users_AppUserId",
                table: "UserParticipatedRides");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Users_AppUserId",
                table: "Vehicles");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "Vehicles",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_AppUserId",
                table: "Vehicles",
                newName: "IX_Vehicles_UserId");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "UserParticipatedRides",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserParticipatedRides_AppUserId",
                table: "UserParticipatedRides",
                newName: "IX_UserParticipatedRides_UserId");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "UserGroups",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserGroups_AppUserId",
                table: "UserGroups",
                newName: "IX_UserGroups_UserId");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "Ratings",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Ratings_AppUserId",
                table: "Ratings",
                newName: "IX_Ratings_UserId");

            migrationBuilder.RenameColumn(
                name: "InvitingAppUserId",
                table: "GroupInvites",
                newName: "InvitingUserId");

            migrationBuilder.RenameColumn(
                name: "InvitedAppUserId",
                table: "GroupInvites",
                newName: "InvitedUserId");

            migrationBuilder.RenameIndex(
                name: "IX_GroupInvites_InvitingAppUserId",
                table: "GroupInvites",
                newName: "IX_GroupInvites_InvitingUserId");

            migrationBuilder.RenameIndex(
                name: "IX_GroupInvites_InvitedAppUserId",
                table: "GroupInvites",
                newName: "IX_GroupInvites_InvitedUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupInvites_Users_InvitedUserId",
                table: "GroupInvites",
                column: "InvitedUserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupInvites_Users_InvitingUserId",
                table: "GroupInvites",
                column: "InvitingUserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Users_UserId",
                table: "Ratings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroups_Users_UserId",
                table: "UserGroups",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserParticipatedRides_Users_UserId",
                table: "UserParticipatedRides",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Users_UserId",
                table: "Vehicles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
