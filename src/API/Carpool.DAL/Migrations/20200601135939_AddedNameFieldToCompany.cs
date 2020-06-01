using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
    public partial class AddedNameFieldToCompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Companies",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Companies");
        }
    }
}
