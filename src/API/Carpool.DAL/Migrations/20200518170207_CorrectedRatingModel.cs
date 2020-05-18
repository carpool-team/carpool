using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
    public partial class CorrectedRatingModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rating_Users_EvaluatingPersonId",
                table: "Rating");

            migrationBuilder.DropIndex(
                name: "IX_Rating_EvaluatingPersonId",
                table: "Rating");

            migrationBuilder.DropColumn(
                name: "EvaluatingPersonId",
                table: "Rating");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Rating",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rating_UserId",
                table: "Rating",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rating_Users_UserId",
                table: "Rating",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rating_Users_UserId",
                table: "Rating");

            migrationBuilder.DropIndex(
                name: "IX_Rating_UserId",
                table: "Rating");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Rating");

            migrationBuilder.AddColumn<Guid>(
                name: "EvaluatingPersonId",
                table: "Rating",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rating_EvaluatingPersonId",
                table: "Rating",
                column: "EvaluatingPersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rating_Users_EvaluatingPersonId",
                table: "Rating",
                column: "EvaluatingPersonId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
