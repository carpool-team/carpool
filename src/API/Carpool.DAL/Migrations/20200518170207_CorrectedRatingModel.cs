using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
	public partial class CorrectedRatingModel : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_Rating_Users_EvaluatingPersonId",
				"Rating");

			migrationBuilder.DropIndex(
				"IX_Rating_EvaluatingPersonId",
				"Rating");

			migrationBuilder.DropColumn(
				"EvaluatingPersonId",
				"Rating");

			migrationBuilder.AddColumn<Guid>(
				"UserId",
				"Rating",
				nullable: true);

			migrationBuilder.CreateIndex(
				"IX_Rating_UserId",
				"Rating",
				"UserId");

			migrationBuilder.AddForeignKey(
				"FK_Rating_Users_UserId",
				"Rating",
				"UserId",
				"Users",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_Rating_Users_UserId",
				"Rating");

			migrationBuilder.DropIndex(
				"IX_Rating_UserId",
				"Rating");

			migrationBuilder.DropColumn(
				"UserId",
				"Rating");

			migrationBuilder.AddColumn<Guid>(
				"EvaluatingPersonId",
				"Rating",
				"uniqueidentifier",
				nullable: true);

			migrationBuilder.CreateIndex(
				"IX_Rating_EvaluatingPersonId",
				"Rating",
				"EvaluatingPersonId");

			migrationBuilder.AddForeignKey(
				"FK_Rating_Users_EvaluatingPersonId",
				"Rating",
				"EvaluatingPersonId",
				"Users",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);
		}
	}
}