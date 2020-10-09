using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
	public partial class DeletedSingletonIdFromIntersections : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropColumn(
				"Id",
				"UserParticipatedRides");

			migrationBuilder.DropColumn(
				"Id",
				"UserGroup");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddColumn<Guid>(
				"Id",
				"UserParticipatedRides",
				"uniqueidentifier",
				nullable: false,
				defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

			migrationBuilder.AddColumn<Guid>(
				"Id",
				"UserGroup",
				"uniqueidentifier",
				nullable: false,
				defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
		}
	}
}