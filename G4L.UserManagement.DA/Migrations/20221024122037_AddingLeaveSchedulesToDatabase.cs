using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class AddingLeaveSchedulesToDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LeaveSchedule_Leaves_LeaveId",
                table: "LeaveSchedule");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LeaveSchedule",
                table: "LeaveSchedule");

            migrationBuilder.RenameTable(
                name: "LeaveSchedule",
                newName: "LeaveSchedules");

            migrationBuilder.RenameIndex(
                name: "IX_LeaveSchedule_LeaveId",
                table: "LeaveSchedules",
                newName: "IX_LeaveSchedules_LeaveId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LeaveSchedules",
                table: "LeaveSchedules",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveSchedules_Leaves_LeaveId",
                table: "LeaveSchedules",
                column: "LeaveId",
                principalTable: "Leaves",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LeaveSchedules_Leaves_LeaveId",
                table: "LeaveSchedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LeaveSchedules",
                table: "LeaveSchedules");

            migrationBuilder.RenameTable(
                name: "LeaveSchedules",
                newName: "LeaveSchedule");

            migrationBuilder.RenameIndex(
                name: "IX_LeaveSchedules_LeaveId",
                table: "LeaveSchedule",
                newName: "IX_LeaveSchedule_LeaveId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LeaveSchedule",
                table: "LeaveSchedule",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveSchedule_Leaves_LeaveId",
                table: "LeaveSchedule",
                column: "LeaveId",
                principalTable: "Leaves",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
