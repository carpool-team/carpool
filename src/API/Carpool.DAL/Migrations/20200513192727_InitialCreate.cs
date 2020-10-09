using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
	public partial class InitialCreate : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
				"Companies",
				table => new
				{
					Id = table.Column<Guid>(nullable: false)
				},
				constraints: table => { table.PrimaryKey("PK_Companies", x => x.Id); });

			migrationBuilder.CreateTable(
				"Coordinates",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					Longitude = table.Column<double>(nullable: false),
					Latitude = table.Column<double>(nullable: false)
				},
				constraints: table => { table.PrimaryKey("PK_Coordinates", x => x.Id); });

			migrationBuilder.CreateTable(
				"Groups",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					Name = table.Column<string>(nullable: true)
				},
				constraints: table => { table.PrimaryKey("PK_Groups", x => x.Id); });

			migrationBuilder.CreateTable(
				"LocationNames",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					Name = table.Column<string>(nullable: true)
				},
				constraints: table => { table.PrimaryKey("PK_LocationNames", x => x.Id); });

			migrationBuilder.CreateTable(
				"Users",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					FirstName = table.Column<string>(nullable: true),
					LastName = table.Column<string>(nullable: true),
					Email = table.Column<string>(nullable: true),
					PhoneNumber = table.Column<string>(nullable: true),
					CompanyId = table.Column<Guid>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Users", x => x.Id);
					table.ForeignKey(
						"FK_Users_Companies_CompanyId",
						x => x.CompanyId,
						"Companies",
						"Id",
						onDelete: ReferentialAction.Restrict);
				});

			migrationBuilder.CreateTable(
				"Locations",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					CoordinatesId = table.Column<Guid>(nullable: true),
					LocationNameId = table.Column<Guid>(nullable: true),
					UserId = table.Column<Guid>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Locations", x => x.Id);
					table.ForeignKey(
						"FK_Locations_Coordinates_CoordinatesId",
						x => x.CoordinatesId,
						"Coordinates",
						"Id",
						onDelete: ReferentialAction.Restrict);

					table.ForeignKey(
						"FK_Locations_LocationNames_LocationNameId",
						x => x.LocationNameId,
						"LocationNames",
						"Id",
						onDelete: ReferentialAction.Restrict);

					table.ForeignKey(
						"FK_Locations_Users_UserId",
						x => x.UserId,
						"Users",
						"Id",
						onDelete: ReferentialAction.Restrict);
				});

			migrationBuilder.CreateTable(
				"UserGroup",
				table => new
				{
					UserId = table.Column<Guid>(nullable: false),
					GroupId = table.Column<Guid>(nullable: false),
					Id = table.Column<Guid>(nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_UserGroup", x => new {x.UserId, x.GroupId});
					table.ForeignKey(
						"FK_UserGroup_Groups_GroupId",
						x => x.GroupId,
						"Groups",
						"Id",
						onDelete: ReferentialAction.Cascade);

					table.ForeignKey(
						"FK_UserGroup_Users_UserId",
						x => x.UserId,
						"Users",
						"Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateIndex(
				"IX_Locations_CoordinatesId",
				"Locations",
				"CoordinatesId");

			migrationBuilder.CreateIndex(
				"IX_Locations_LocationNameId",
				"Locations",
				"LocationNameId");

			migrationBuilder.CreateIndex(
				"IX_Locations_UserId",
				"Locations",
				"UserId");

			migrationBuilder.CreateIndex(
				"IX_UserGroup_GroupId",
				"UserGroup",
				"GroupId");

			migrationBuilder.CreateIndex(
				"IX_Users_CompanyId",
				"Users",
				"CompanyId");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				"Locations");

			migrationBuilder.DropTable(
				"UserGroup");

			migrationBuilder.DropTable(
				"Coordinates");

			migrationBuilder.DropTable(
				"LocationNames");

			migrationBuilder.DropTable(
				"Groups");

			migrationBuilder.DropTable(
				"Users");

			migrationBuilder.DropTable(
				"Companies");
		}
	}
}