using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
	public partial class AddedUserIdToStopModel : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_Stops_Users_UserId",
				"Stops");

			migrationBuilder.AlterColumn<Guid>(
				"UserId",
				"Stops",
				nullable: false,
				oldClrType: typeof(Guid),
				oldType: "uniqueidentifier",
				oldNullable: true);

			migrationBuilder.AddForeignKey(
				"FK_Stops_Users_UserId",
				"Stops",
				"UserId",
				"Users",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_Stops_Users_UserId",
				"Stops");

			migrationBuilder.AlterColumn<Guid>(
				"UserId",
				"Stops",
				"uniqueidentifier",
				nullable: true,
				oldClrType: typeof(Guid));

			migrationBuilder.AddForeignKey(
				"FK_Stops_Users_UserId",
				"Stops",
				"UserId",
				"Users",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);
		}
	}
}