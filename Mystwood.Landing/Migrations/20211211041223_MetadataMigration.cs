using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mystwood.Landing.Migrations
{
    public partial class MetadataMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AccountId",
                table: "Characters",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CharacterRevisionEvents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CharacterRevisionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    State = table.Column<int>(type: "int", nullable: false),
                    ChangedOn = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CharacterRevisionEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CharacterRevisionEvents_CharacterRevisions_CharacterRevisionId",
                        column: x => x.CharacterRevisionId,
                        principalTable: "CharacterRevisions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Characters_AccountId",
                table: "Characters",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_CharacterRevisionEvents_CharacterRevisionId",
                table: "CharacterRevisionEvents",
                column: "CharacterRevisionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Characters_Accounts_AccountId",
                table: "Characters",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Characters_Accounts_AccountId",
                table: "Characters");

            migrationBuilder.DropTable(
                name: "CharacterRevisionEvents");

            migrationBuilder.DropIndex(
                name: "IX_Characters_AccountId",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "Characters");
        }
    }
}
