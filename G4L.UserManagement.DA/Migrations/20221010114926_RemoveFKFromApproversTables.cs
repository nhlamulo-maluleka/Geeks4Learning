using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class RemoveFKFromApproversTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Approvers_Users_UserId",
                table: "Approvers");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Approvers",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Approvers_Users_UserId",
                table: "Approvers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Approvers_Users_UserId",
                table: "Approvers");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Approvers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Approvers_Users_UserId",
                table: "Approvers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
