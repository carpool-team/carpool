using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
	public partial class MadeLocationIdInGroupNullable : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AlterColumn<Guid>("LocationId",
				"Groups",
				nullable: true,
				oldClrType: typeof(Guid),
				oldType: "uniqueidentifier");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AlterColumn<Guid>("LocationId",
				"Groups",
				"uniqueidentifier",
				nullable: false,
				oldClrType: typeof(Guid),
				oldNullable: true);
		}
	}
}