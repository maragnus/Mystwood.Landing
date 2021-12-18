using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mystwood.Landing.Migrations
{
    public partial class RsvpMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Hidden",
                table: "Events",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ChangedByAccountId",
                table: "CharacterRevisionEvents",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ChangedByAcountId",
                table: "CharacterRevisionEvents",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AccountAttendanceUpdate",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountAttendanceId = table.Column<int>(type: "int", nullable: false),
                    Rsvp = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedByAccountId = table.Column<int>(type: "int", nullable: true),
                    UpdatedOn = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountAttendanceUpdate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AccountAttendanceUpdate_AccountAttendances_AccountAttendanceId",
                        column: x => x.AccountAttendanceId,
                        principalTable: "AccountAttendances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CharacterRevisionEvents_ChangedByAcountId",
                table: "CharacterRevisionEvents",
                column: "ChangedByAcountId");

            migrationBuilder.CreateIndex(
                name: "IX_AccountAttendanceUpdate_AccountAttendanceId",
                table: "AccountAttendanceUpdate",
                column: "AccountAttendanceId");

            migrationBuilder.AddForeignKey(
                name: "FK_CharacterRevisionEvents_Accounts_ChangedByAcountId",
                table: "CharacterRevisionEvents",
                column: "ChangedByAcountId",
                principalTable: "Accounts",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CharacterRevisionEvents_Accounts_ChangedByAcountId",
                table: "CharacterRevisionEvents");

            migrationBuilder.DropTable(
                name: "AccountAttendanceUpdate");

            migrationBuilder.DropIndex(
                name: "IX_CharacterRevisionEvents_ChangedByAcountId",
                table: "CharacterRevisionEvents");

            migrationBuilder.DropColumn(
                name: "Hidden",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "ChangedByAccountId",
                table: "CharacterRevisionEvents");

            migrationBuilder.DropColumn(
                name: "ChangedByAcountId",
                table: "CharacterRevisionEvents");
        }
    }
}
