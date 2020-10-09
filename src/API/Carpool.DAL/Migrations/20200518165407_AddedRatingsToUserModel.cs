using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
	public partial class AddedRatingsToUserModel : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
				"Rating",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					Value = table.Column<int>(nullable: false),
					EvaluatingPersonId = table.Column<Guid>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Rating", x => x.Id);
					table.ForeignKey(
						"FK_Rating_Users_EvaluatingPersonId",
						x => x.EvaluatingPersonId,
						"Users",
						"Id",
						onDelete: ReferentialAction.Restrict);
				});

			migrationBuilder.CreateIndex(
				"IX_Rating_EvaluatingPersonId",
				"Rating",
				"EvaluatingPersonId");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				"Rating");
		}
	}
}