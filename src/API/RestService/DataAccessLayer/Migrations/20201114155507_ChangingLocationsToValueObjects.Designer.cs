﻿// <auto-generated />
using System;
using DataAccessLayer.DatabaseContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DataAccessLayer.Migrations
{
    [DbContext(typeof(CarpoolDbContext))]
    [Migration("20201114155507_ChangingLocationsToValueObjects")]
    partial class ChangingLocationsToValueObjects
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("Domain.Models.Group", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("OwnerId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("Domain.Models.GroupInvite", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("GroupId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("InvitedUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("InvitingUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsAccepted")
                        .HasColumnType("bit");

                    b.Property<bool>("IsPending")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("InvitedUserId");

                    b.HasIndex("InvitingUserId");

                    b.ToTable("GroupInvites");
                });

            modelBuilder.Entity("Domain.Models.Intersections.UserGroup", b =>
                {
                    b.Property<Guid>("GroupId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("GroupId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserGroups");
                });

            modelBuilder.Entity("Domain.Models.Intersections.UserParticipatedRide", b =>
                {
                    b.Property<Guid>("RideId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("RideId1")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("RideId", "UserId");

                    b.HasIndex("RideId1");

                    b.HasIndex("UserId");

                    b.ToTable("UserParticipatedRides");
                });

            modelBuilder.Entity("Domain.Models.Ride", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("DestinationId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("GroupId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("OwnerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<Guid>("StartingLocationId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("OwnerId");

                    b.ToTable("Rides");
                });

            modelBuilder.Entity("Domain.Models.Stop", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("LocationId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RideId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("RideId");

                    b.ToTable("Stops");
                });

            modelBuilder.Entity("Domain.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("VehicleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("VehicleId")
                        .IsUnique()
                        .HasFilter("[VehicleId] IS NOT NULL");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Domain.Models.Vehicle", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("Domain.Models.Group", b =>
                {
                    b.HasOne("Domain.Models.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("Domain.ValueObjects.Location", "Location", b1 =>
                        {
                            b1.Property<Guid>("GroupId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<double>("Latitude")
                                .HasColumnType("float");

                            b1.Property<double>("Longitude")
                                .HasColumnType("float");

                            b1.HasKey("GroupId");

                            b1.ToTable("Groups");

                            b1.WithOwner()
                                .HasForeignKey("GroupId");
                        });

                    b.Navigation("Location")
                        .IsRequired();

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("Domain.Models.GroupInvite", b =>
                {
                    b.HasOne("Domain.Models.User", "InvitedUser")
                        .WithMany()
                        .HasForeignKey("InvitedUserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Domain.Models.User", "InvitingUser")
                        .WithMany()
                        .HasForeignKey("InvitingUserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("InvitedUser");

                    b.Navigation("InvitingUser");
                });

            modelBuilder.Entity("Domain.Models.Intersections.UserGroup", b =>
                {
                    b.HasOne("Domain.Models.Group", "Group")
                        .WithMany("UserGroups")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Domain.Models.User", "User")
                        .WithMany("UserGroups")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Group");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Models.Intersections.UserParticipatedRide", b =>
                {
                    b.HasOne("Domain.Models.Ride", "Ride")
                        .WithMany()
                        .HasForeignKey("RideId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Domain.Models.Ride", null)
                        .WithMany("Participants")
                        .HasForeignKey("RideId1");

                    b.HasOne("Domain.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Ride");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Models.Ride", b =>
                {
                    b.HasOne("Domain.Models.Group", "Group")
                        .WithMany("Rides")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Domain.Models.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.OwnsOne("Domain.ValueObjects.Location", "Destination", b1 =>
                        {
                            b1.Property<Guid>("RideId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<double>("Latitude")
                                .HasColumnType("float");

                            b1.Property<double>("Longitude")
                                .HasColumnType("float");

                            b1.HasKey("RideId");

                            b1.ToTable("Rides");

                            b1.WithOwner()
                                .HasForeignKey("RideId");
                        });

                    b.OwnsOne("Domain.ValueObjects.Location", "StartingLocation", b1 =>
                        {
                            b1.Property<Guid>("RideId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<double>("Latitude")
                                .HasColumnType("float");

                            b1.Property<double>("Longitude")
                                .HasColumnType("float");

                            b1.HasKey("RideId");

                            b1.ToTable("Rides");

                            b1.WithOwner()
                                .HasForeignKey("RideId");
                        });

                    b.Navigation("Destination")
                        .IsRequired();

                    b.Navigation("Group");

                    b.Navigation("Owner");

                    b.Navigation("StartingLocation")
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Models.Stop", b =>
                {
                    b.HasOne("Domain.Models.Ride", null)
                        .WithMany("Stops")
                        .HasForeignKey("RideId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("Domain.ValueObjects.Location", "Location", b1 =>
                        {
                            b1.Property<Guid>("StopId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<double>("Latitude")
                                .HasColumnType("float");

                            b1.Property<double>("Longitude")
                                .HasColumnType("float");

                            b1.HasKey("StopId");

                            b1.ToTable("Stops");

                            b1.WithOwner()
                                .HasForeignKey("StopId");
                        });

                    b.Navigation("Location")
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Models.User", b =>
                {
                    b.HasOne("Domain.Models.Vehicle", "Vehicle")
                        .WithOne()
                        .HasForeignKey("Domain.Models.User", "VehicleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.OwnsMany("Domain.ValueObjects.Rating", "Ratings", b1 =>
                        {
                            b1.Property<Guid>("UserId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<Guid>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("uniqueidentifier");

                            b1.Property<byte>("Value")
                                .HasColumnType("tinyint");

                            b1.HasKey("UserId", "Id");

                            b1.ToTable("Ratings");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.Navigation("Ratings");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("Domain.Models.Group", b =>
                {
                    b.Navigation("Rides");

                    b.Navigation("UserGroups");
                });

            modelBuilder.Entity("Domain.Models.Ride", b =>
                {
                    b.Navigation("Participants");

                    b.Navigation("Stops");
                });

            modelBuilder.Entity("Domain.Models.User", b =>
                {
                    b.Navigation("UserGroups");
                });
#pragma warning restore 612, 618
        }
    }
}