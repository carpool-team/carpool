using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
	public partial class ChangingLocationsToValueObjects : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey("FK_Groups_Locations_LocationId",
				"Groups");

			migrationBuilder.DropForeignKey("FK_Rides_Locations_DestinationId",
				"Rides");

			migrationBuilder.DropForeignKey("FK_Rides_Locations_StartingLocationId",
				"Rides");

			migrationBuilder.DropForeignKey("FK_Stops_Locations_LocationId",
				"Stops");

			migrationBuilder.DropForeignKey("FK_UserGroups_Groups_GroupId",
				"UserGroups");

			migrationBuilder.DropTable("Locations");

			migrationBuilder.DropIndex("IX_Stops_LocationId",
				"Stops");

			migrationBuilder.DropIndex("IX_Rides_DestinationId",
				"Rides");

			migrationBuilder.DropIndex("IX_Rides_StartingLocationId",
				"Rides");

			migrationBuilder.DropPrimaryKey("PK_Ratings",
				"Ratings");

			migrationBuilder.DropIndex("IX_Ratings_UserId",
				"Ratings");

			migrationBuilder.DropIndex("IX_Groups_LocationId",
				"Groups");

			migrationBuilder.DropColumn("LocationId",
				"Groups");

			migrationBuilder.AlterColumn<string>("Name",
				"Vehicles",
				"nvarchar(max)",
				nullable: false,
				defaultValue: "",
				oldClrType: typeof(string),
				oldType: "nvarchar(max)",
				oldNullable: true);

			migrationBuilder.AlterColumn<string>("LastName",
				"Users",
				"nvarchar(max)",
				nullable: false,
				defaultValue: "",
				oldClrType: typeof(string),
				oldType: "nvarchar(max)",
				oldNullable: true);

			migrationBuilder.AlterColumn<string>("FirstName",
				"Users",
				"nvarchar(max)",
				nullable: false,
				defaultValue: "",
				oldClrType: typeof(string),
				oldType: "nvarchar(max)",
				oldNullable: true);

			migrationBuilder.AddColumn<double>("Location_Latitude",
				"Stops",
				"float",
				nullable: false,
				defaultValue: 0.0);

			migrationBuilder.AddColumn<double>("Location_Longitude",
				"Stops",
				"float",
				nullable: false,
				defaultValue: 0.0);

			migrationBuilder.AddColumn<double>("Destination_Latitude",
				"Rides",
				"float",
				nullable: false,
				defaultValue: 0.0);

			migrationBuilder.AddColumn<double>("Destination_Longitude",
				"Rides",
				"float",
				nullable: false,
				defaultValue: 0.0);

			migrationBuilder.AddColumn<double>("StartingLocation_Latitude",
				"Rides",
				"float",
				nullable: false,
				defaultValue: 0.0);

			migrationBuilder.AddColumn<double>("StartingLocation_Longitude",
				"Rides",
				"float",
				nullable: false,
				defaultValue: 0.0);

			migrationBuilder.AlterColumn<string>("Code",
				"Groups",
				"nvarchar(max)",
				nullable: false,
				defaultValue: "",
				oldClrType: typeof(string),
				oldType: "nvarchar(max)",
				oldNullable: true);

			migrationBuilder.AddColumn<double>("Location_Latitude",
				"Groups",
				"float",
				nullable: false,
				defaultValue: 0.0);

			migrationBuilder.AddColumn<double>("Location_Longitude",
				"Groups",
				"float",
				nullable: false,
				defaultValue: 0.0);

			migrationBuilder.AddPrimaryKey("PK_Ratings",
				"Ratings",
				new[] {"UserId", "Id"});

			migrationBuilder.AddForeignKey("FK_UserGroups_Groups_GroupId",
				"UserGroups",
				"GroupId",
				"Groups",
				principalColumn: "Id");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey("FK_UserGroups_Groups_GroupId",
				"UserGroups");

			migrationBuilder.DropPrimaryKey("PK_Ratings",
				"Ratings");

			migrationBuilder.DropColumn("Location_Latitude",
				"Stops");

			migrationBuilder.DropColumn("Location_Longitude",
				"Stops");

			migrationBuilder.DropColumn("Destination_Latitude",
				"Rides");

			migrationBuilder.DropColumn("Destination_Longitude",
				"Rides");

			migrationBuilder.DropColumn("StartingLocation_Latitude",
				"Rides");

			migrationBuilder.DropColumn("StartingLocation_Longitude",
				"Rides");

			migrationBuilder.DropColumn("Location_Latitude",
				"Groups");

			migrationBuilder.DropColumn("Location_Longitude",
				"Groups");

			migrationBuilder.AlterColumn<string>("Name",
				"Vehicles",
				"nvarchar(max)",
				nullable: true,
				oldClrType: typeof(string),
				oldType: "nvarchar(max)");

			migrationBuilder.AlterColumn<string>("LastName",
				"Users",
				"nvarchar(max)",
				nullable: true,
				oldClrType: typeof(string),
				oldType: "nvarchar(max)");

			migrationBuilder.AlterColumn<string>("FirstName",
				"Users",
				"nvarchar(max)",
				nullable: true,
				oldClrType: typeof(string),
				oldType: "nvarchar(max)");

			migrationBuilder.AlterColumn<string>("Code",
				"Groups",
				"nvarchar(max)",
				nullable: true,
				oldClrType: typeof(string),
				oldType: "nvarchar(max)");

			migrationBuilder.AddColumn<Guid>("LocationId",
				"Groups",
				"uniqueidentifier",
				nullable: true);

			migrationBuilder.AddPrimaryKey("PK_Ratings",
				"Ratings",
				"Id");

			migrationBuilder.CreateTable("Locations",
				table => new
				{
					Id = table.Column<Guid>("uniqueidentifier", nullable: false),
					Latitude = table.Column<double>("float", nullable: false),
					Longitude = table.Column<double>("float", nullable: false),
					Name = table.Column<string>("nvarchar(max)", nullable: true)
				},
				constraints: table => { table.PrimaryKey("PK_Locations", x => x.Id); });

			migrationBuilder.CreateIndex("IX_Stops_LocationId",
				"Stops",
				"LocationId");

			migrationBuilder.CreateIndex("IX_Rides_DestinationId",
				"Rides",
				"DestinationId");

			migrationBuilder.CreateIndex("IX_Rides_StartingLocationId",
				"Rides",
				"StartingLocationId");

			migrationBuilder.CreateIndex("IX_Ratings_UserId",
				"Ratings",
				"UserId");

			migrationBuilder.CreateIndex("IX_Groups_LocationId",
				"Groups",
				"LocationId");

			migrationBuilder.AddForeignKey("FK_Groups_Locations_LocationId",
				"Groups",
				"LocationId",
				"Locations",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);

			migrationBuilder.AddForeignKey("FK_Rides_Locations_DestinationId",
				"Rides",
				"DestinationId",
				"Locations",
				principalColumn: "Id");

			migrationBuilder.AddForeignKey("FK_Rides_Locations_StartingLocationId",
				"Rides",
				"StartingLocationId",
				"Locations",
				principalColumn: "Id");

			migrationBuilder.AddForeignKey("FK_Stops_Locations_LocationId",
				"Stops",
				"LocationId",
				"Locations",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);

			migrationBuilder.AddForeignKey("FK_UserGroups_Groups_GroupId",
				"UserGroups",
				"GroupId",
				"Groups",
				principalColumn: "Id",
				onDelete: ReferentialAction.Cascade);
		}
	}
}