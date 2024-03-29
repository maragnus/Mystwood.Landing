﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Mystwood.Landing.Data;

#nullable disable

namespace Mystwood.Landing.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20211213191504_AdminMigration")]
    partial class AdminMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Mystwood.Landing.Data.Account", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("Id"), 1L, 1);

                    b.Property<DateTimeOffset?>("Created")
                        .IsRequired()
                        .HasColumnType("datetimeoffset");

                    b.Property<bool?>("IsAdmin")
                        .IsRequired()
                        .HasColumnType("bit");

                    b.Property<bool?>("IsValid")
                        .IsRequired()
                        .HasColumnType("bit");

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("Mystwood.Landing.Data.Character", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("AccountId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<DateTimeOffset?>("CreatedOn")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("Metadata")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.ToTable("Characters");
                });

            modelBuilder.Entity("Mystwood.Landing.Data.CharacterRevision", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CharacterId")
                        .IsRequired()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTimeOffset?>("CreatedOn")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("Json")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("State")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CharacterId");

                    b.ToTable("CharacterRevisions");
                });

            modelBuilder.Entity("Mystwood.Landing.Data.CharacterRevisionEvent", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTimeOffset?>("ChangedOn")
                        .HasColumnType("datetimeoffset");

                    b.Property<Guid?>("CharacterRevisionId")
                        .IsRequired()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("State")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CharacterRevisionId");

                    b.ToTable("CharacterRevisionEvents");
                });

            modelBuilder.Entity("Mystwood.Landing.Data.EmailAddress", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("Id"), 1L, 1);

                    b.Property<int?>("AccountId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmailNormalized")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.ToTable("EmailAddresses");
                });

            modelBuilder.Entity("Mystwood.Landing.Data.Session", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTimeOffset?>("Accessed")
                        .HasColumnType("datetimeoffset");

                    b.Property<int?>("AccountId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<DateTimeOffset?>("Created")
                        .HasColumnType("datetimeoffset");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("Mystwood.Landing.Data.Token", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("Id"), 1L, 1);

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTimeOffset?>("Consumed")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("ConsumedEndPoint")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTimeOffset?>("Created")
                        .IsRequired()
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("CreatedEndPoint")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTimeOffset?>("Expires")
                        .IsRequired()
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("Source")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Tokens");
                });

            modelBuilder.Entity("Mystwood.Landing.Data.Character", b =>
                {
                    b.HasOne("Mystwood.Landing.Data.Account", "Account")
                        .WithMany()
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("Mystwood.Landing.Data.CharacterRevision", b =>
                {
                    b.HasOne("Mystwood.Landing.Data.Character", "Character")
                        .WithMany("CharacterRevisions")
                        .HasForeignKey("CharacterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Character");
                });

            modelBuilder.Entity("Mystwood.Landing.Data.CharacterRevisionEvent", b =>
                {
                    b.HasOne("Mystwood.Landing.Data.CharacterRevision", "CharacterRevision")
                        .WithMany("CharacterRevisionEvents")
                        .HasForeignKey("CharacterRevisionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CharacterRevision");
                });

            modelBuilder.Entity("Mystwood.Landing.Data.EmailAddress", b =>
                {
                    b.HasOne("Mystwood.Landing.Data.Account", "Account")
                        .WithMany("EmailAddresses")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("Mystwood.Landing.Data.Session", b =>
                {
                    b.HasOne("Mystwood.Landing.Data.Account", "Account")
                        .WithMany("Sessions")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("Mystwood.Landing.Data.Account", b =>
                {
                    b.Navigation("EmailAddresses");

                    b.Navigation("Sessions");
                });

            modelBuilder.Entity("Mystwood.Landing.Data.Character", b =>
                {
                    b.Navigation("CharacterRevisions");
                });

            modelBuilder.Entity("Mystwood.Landing.Data.CharacterRevision", b =>
                {
                    b.Navigation("CharacterRevisionEvents");
                });
#pragma warning restore 612, 618
        }
    }
}
