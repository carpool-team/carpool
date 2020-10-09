using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
	public partial class AddedGroupInvitesTable : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_Rating_Users_UserId",
				"Rating");

			migrationBuilder.DropForeignKey(
				"FK_Users_Vehicle_VehicleId",
				"Users");

			migrationBuilder.DropPrimaryKey(
				"PK_Vehicle",
				"Vehicle");

			migrationBuilder.DropPrimaryKey(
				"PK_Rating",
				"Rating");

			migrationBuilder.RenameTable(
				"Vehicle",
				newName: "Vehicles");

			migrationBuilder.RenameTable(
				"Rating",
				newName: "Ratings");

			migrationBuilder.RenameIndex(
				"IX_Rating_UserId",
				table: "Ratings",
				newName: "IX_Ratings_UserId");

			migrationBuilder.AddPrimaryKey(
				"PK_Vehicles",
				"Vehicles",
				"Id");

			migrationBuilder.AddPrimaryKey(
				"PK_Ratings",
				"Ratings",
				"Id");

			migrationBuilder.CreateTable(
				"GroupInvites",
				table => new
				{
					Id = table.Column<Guid>(nullable: false),
					IsPending = table.Column<bool>(nullable: false),
					GroupId = table.Column<Guid>(nullable: true),
					InvitedUserId = table.Column<Guid>(nullable: false),
					IsAccepted = table.Column<bool>(nullable: false),
					UserId = table.Column<Guid>(nullable: true)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_GroupInvites", x => x.Id);
					table.ForeignKey(
						"FK_GroupInvites_Groups_GroupId",
						x => x.GroupId,
						"Groups",
						"Id",
						onDelete: ReferentialAction.Restrict);

					table.ForeignKey(
						"FK_GroupInvites_Users_InvitedUserId",
						x => x.InvitedUserId,
						"Users",
						"Id",
						onDelete: ReferentialAction.Cascade);

					table.ForeignKey(
						"FK_GroupInvites_Users_UserId",
						x => x.UserId,
						"Users",
						"Id",
						onDelete: ReferentialAction.Restrict);
				});

			migrationBuilder.CreateIndex(
				"IX_GroupInvites_GroupId",
				"GroupInvites",
				"GroupId");

			migrationBuilder.CreateIndex(
				"IX_GroupInvites_InvitedUserId",
				"GroupInvites",
				"InvitedUserId");

			migrationBuilder.CreateIndex(
				"IX_GroupInvites_UserId",
				"GroupInvites",
				"UserId");

			migrationBuilder.AddForeignKey(
				"FK_Ratings_Users_UserId",
				"Ratings",
				"UserId",
				"Users",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);

			migrationBuilder.AddForeignKey(
				"FK_Users_Vehicles_VehicleId",
				"Users",
				"VehicleId",
				"Vehicles",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropForeignKey(
				"FK_Ratings_Users_UserId",
				"Ratings");

			migrationBuilder.DropForeignKey(
				"FK_Users_Vehicles_VehicleId",
				"Users");

			migrationBuilder.DropTable(
				"GroupInvites");

			migrationBuilder.DropPrimaryKey(
				"PK_Vehicles",
				"Vehicles");

			migrationBuilder.DropPrimaryKey(
				"PK_Ratings",
				"Ratings");

			migrationBuilder.RenameTable(
				"Vehicles",
				newName: "Vehicle");

			migrationBuilder.RenameTable(
				"Ratings",
				newName: "Rating");

			migrationBuilder.RenameIndex(
				"IX_Ratings_UserId",
				table: "Rating",
				newName: "IX_Rating_UserId");

			migrationBuilder.AddPrimaryKey(
				"PK_Vehicle",
				"Vehicle",
				"Id");

			migrationBuilder.AddPrimaryKey(
				"PK_Rating",
				"Rating",
				"Id");

			migrationBuilder.AddForeignKey(
				"FK_Rating_Users_UserId",
				"Rating",
				"UserId",
				"Users",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);

			migrationBuilder.AddForeignKey(
				"FK_Users_Vehicle_VehicleId",
				"Users",
				"VehicleId",
				"Vehicle",
				principalColumn: "Id",
				onDelete: ReferentialAction.Restrict);
		}
	}
}