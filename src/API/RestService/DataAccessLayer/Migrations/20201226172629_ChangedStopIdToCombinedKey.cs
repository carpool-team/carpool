using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class ChangedStopIdToCombinedKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Stops",
                table: "Stops");

            migrationBuilder.DropIndex(
                name: "IX_Stops_ParticipantId",
                table: "Stops");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Stops");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Stops",
                table: "Stops",
                columns: new[] { "ParticipantId", "RideId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Stops",
                table: "Stops");

            migrationBuilder.AddColumn<long>(
                name: "Id",
                table: "Stops",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Stops",
                table: "Stops",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Stops_ParticipantId",
                table: "Stops",
                column: "ParticipantId");
        }
    }
}
