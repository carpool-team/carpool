using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
	public partial class test : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropPrimaryKey("PK_Ratings",
				"Ratings");

			migrationBuilder.DropColumn("DestinationId",
				"Rides");

			migrationBuilder.DropColumn("StartingLocationId",
				"Rides");

			migrationBuilder.AddPrimaryKey("PK_Ratings",
				"Ratings",
				"Id");

			migrationBuilder.CreateIndex("IX_Ratings_UserId",
				"Ratings",
				"UserId");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropPrimaryKey("PK_Ratings",
				"Ratings");

			migrationBuilder.DropIndex("IX_Ratings_UserId",
				"Ratings");

			migrationBuilder.AddColumn<Guid>("DestinationId",
				"Rides",
				"uniqueidentifier",
				nullable: false,
				defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

			migrationBuilder.AddColumn<Guid>("StartingLocationId",
				"Rides",
				"uniqueidentifier",
				nullable: false,
				defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

			migrationBuilder.AddPrimaryKey("PK_Ratings",
				"Ratings",
				new[] {"UserId", "Id"});
		}
	}
}