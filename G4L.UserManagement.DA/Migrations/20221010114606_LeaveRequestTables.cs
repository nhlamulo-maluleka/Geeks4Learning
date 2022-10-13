using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class LeaveRequestTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Approvers_UserId",
                table: "Approvers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Approvers_Users_UserId",
                table: "Approvers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Approvers_Users_UserId",
                table: "Approvers");

            migrationBuilder.DropIndex(
                name: "IX_Approvers_UserId",
                table: "Approvers");
        }
    }
}
