using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mystwood.Landing.Migrations
{
    public partial class EventsMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "Accounts",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Metadata",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EventDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EventType = table.Column<int>(type: "int", nullable: false),
                    Rsvp = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AccountAttendances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    EventId = table.Column<int>(type: "int", nullable: false),
                    Rsvp = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Moonstone = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountAttendances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AccountAttendances_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AccountAttendances_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CharacterAttendances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CharacterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EventId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CharacterAttendances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CharacterAttendances_Characters_CharacterId",
                        column: x => x.CharacterId,
                        principalTable: "Characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CharacterAttendances_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccountAttendances_AccountId_EventId",
                table: "AccountAttendances",
                columns: new[] { "AccountId", "EventId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AccountAttendances_EventId",
                table: "AccountAttendances",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_CharacterAttendances_CharacterId_EventId",
                table: "CharacterAttendances",
                columns: new[] { "CharacterId", "EventId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CharacterAttendances_EventId",
                table: "CharacterAttendances",
                column: "EventId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountAttendances");

            migrationBuilder.DropTable(
                name: "CharacterAttendances");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "Metadata",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Accounts");
        }
    }
}
