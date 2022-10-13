using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class RemoveUserObjectRefFromApproversTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Approvers_Users_UserId",
                table: "Approvers");

            migrationBuilder.DropIndex(
                name: "IX_Approvers_UserId",
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Approvers",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

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
                onDelete: ReferentialAction.Restrict);
        }
    }
}
