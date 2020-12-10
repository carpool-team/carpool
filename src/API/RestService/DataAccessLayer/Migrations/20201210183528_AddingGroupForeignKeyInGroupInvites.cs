using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class AddingGroupForeignKeyInGroupInvites : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_GroupInvites_GroupId",
                table: "GroupInvites",
                column: "GroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupInvites_Groups_GroupId",
                table: "GroupInvites",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupInvites_Groups_GroupId",
                table: "GroupInvites");

            migrationBuilder.DropIndex(
                name: "IX_GroupInvites_GroupId",
                table: "GroupInvites");
        }
    }
}
