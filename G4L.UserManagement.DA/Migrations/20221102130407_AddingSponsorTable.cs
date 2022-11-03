using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class AddingSponsorTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Approvers_Leaves_LeaveId",
                table: "Approvers");

            migrationBuilder.AddColumn<Guid>(
                name: "SponsorId",
                table: "Users",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "LeaveId",
                table: "Approvers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Sponsors",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sponsors", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_SponsorId",
                table: "Users",
                column: "SponsorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Approvers_Leaves_LeaveId",
                table: "Approvers",
                column: "LeaveId",
                principalTable: "Leaves",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Sponsors_SponsorId",
                table: "Users",
                column: "SponsorId",
                principalTable: "Sponsors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Approvers_Leaves_LeaveId",
                table: "Approvers");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Sponsors_SponsorId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Sponsors");

            migrationBuilder.DropIndex(
                name: "IX_Users_SponsorId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SponsorId",
                table: "Users");

            migrationBuilder.AlterColumn<Guid>(
                name: "LeaveId",
                table: "Approvers",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Approvers_Leaves_LeaveId",
                table: "Approvers",
                column: "LeaveId",
                principalTable: "Leaves",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
