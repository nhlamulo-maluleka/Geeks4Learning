using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class fourth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PauseCount",
                table: "Goals",
                newName: "PausedCount");

            migrationBuilder.AddColumn<int>(
                name: "CommentType",
                table: "GoalComment",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CommentType",
                table: "GoalComment");

            migrationBuilder.RenameColumn(
                name: "PausedCount",
                table: "Goals",
                newName: "PauseCount");
        }
    }
}
