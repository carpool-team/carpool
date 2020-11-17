using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
	public partial class UserGroupOnDeleteIsNowCascade : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_UserGroups_Groups_GroupId",
				"UserGroups");

			migrationBuilder.AddForeignKey(
				"FK_UserGroups_Groups_GroupId",
				"UserGroups",
				"GroupId",
				"Groups",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_UserGroups_Groups_GroupId",
				"UserGroups");

			migrationBuilder.AddForeignKey(
				"FK_UserGroups_Groups_GroupId",
				"UserGroups",
				"GroupId",
				"Groups",
				principalColumn: "Id");
		}
	}
}