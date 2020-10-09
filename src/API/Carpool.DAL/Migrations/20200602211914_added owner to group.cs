using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
	public partial class addedownertogroup : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddColumn<Guid>(
				"OwnerId",
				"Groups",
				nullable: true);

			migrationBuilder.CreateIndex(
				"IX_Groups_OwnerId",
				"Groups",
				"OwnerId");

			migrationBuilder.AddForeignKey(
				"FK_Groups_Users_OwnerId",
				"Groups",
				"OwnerId",
				"Users",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_Groups_Users_OwnerId",
				"Groups");

			migrationBuilder.DropIndex(
				"IX_Groups_OwnerId",
				"Groups");

			migrationBuilder.DropColumn(
				"OwnerId",
				"Groups");
		}
	}
}