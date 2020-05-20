using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.DAL.Migrations
{
    public partial class AddedGroupCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Groups",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "Groups");
        }
    }
}
