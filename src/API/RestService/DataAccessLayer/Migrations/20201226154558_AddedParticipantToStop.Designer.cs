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
    [Migration("20201226154558_AddedParticipantToStop")]
    partial class AddedParticipantToStop
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("Domain.Entities.ApplicationUser", b =>
                {
                    b.Property<long>("Id")
                        .HasColumnType("bigint");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Domain.Entities.Group", b =>
                {
                    b.Property<long>("Id")
                        .HasColumnType("bigint");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("OwnerId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("Domain.Entities.GroupInvite", b =>
                {
                    b.Property<long>("Id")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("datetime2");

                    b.Property<long>("GroupId")
                        .HasColumnType("bigint");

                    b.Property<long>("InvitedAppUserId")
                        .HasColumnType("bigint");

                    b.Property<long>("InvitingAppUserId")
                        .HasColumnType("bigint");

                    b.Property<bool>("IsAccepted")
                        .HasColumnType("bit");

                    b.Property<bool>("IsPending")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("InvitedAppUserId");

                    b.HasIndex("InvitingAppUserId");

                    b.ToTable("GroupInvites");
                });

            modelBuilder.Entity("Domain.Entities.Intersections.UserGroup", b =>
                {
                    b.Property<long>("GroupId")
                        .HasColumnType("bigint");

                    b.Property<long>("AppUserId")
                        .HasColumnType("bigint");

                    b.HasKey("GroupId", "AppUserId");

                    b.HasIndex("AppUserId");

                    b.ToTable("UserGroups");
                });

            modelBuilder.Entity("Domain.Entities.Intersections.UserParticipatedRide", b =>
                {
                    b.Property<long>("RideId")
                        .HasColumnType("bigint");

                    b.Property<long>("AppUserId")
                        .HasColumnType("bigint");

                    b.HasKey("RideId", "AppUserId");

                    b.HasIndex("AppUserId");

                    b.ToTable("UserParticipatedRides");
                });

            modelBuilder.Entity("Domain.Entities.Ride", b =>
                {
                    b.Property<long>("Id")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<long>("GroupId")
                        .HasColumnType("bigint");

                    b.Property<long>("OwnerId")
                        .HasColumnType("bigint");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<int>("RideDirection")
                        .HasColumnType("int");

                    b.Property<byte>("SeatsLimit")
                        .HasColumnType("tinyint");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("OwnerId");

                    b.ToTable("Rides");
                });

            modelBuilder.Entity("Domain.Entities.RideRequest", b =>
                {
                    b.Property<long>("Id")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsAccepted")
                        .HasColumnType("bit");

                    b.Property<bool>("IsPending")
                        .HasColumnType("bit");

                    b.Property<long>("RequestingUserId")
                        .HasColumnType("bigint");

                    b.Property<long>("RideId")
                        .HasColumnType("bigint");

                    b.Property<long>("RideOwnerId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("RequestingUserId");

                    b.HasIndex("RideId");

                    b.HasIndex("RideOwnerId");

                    b.ToTable("RideRequests");
                });

            modelBuilder.Entity("Domain.Entities.Stop", b =>
                {
                    b.Property<long>("Id")
                        .HasColumnType("bigint");

                    b.Property<long>("ParticipantId")
                        .HasColumnType("bigint");

                    b.Property<long>("RideId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("ParticipantId");

                    b.HasIndex("RideId");

                    b.ToTable("Stops");
                });

            modelBuilder.Entity("Domain.Entities.Vehicle", b =>
                {
                    b.Property<long>("Id")
                        .HasColumnType("bigint");

                    b.Property<long>("AppUserId")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId")
                        .IsUnique();

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("Domain.Entities.ApplicationUser", b =>
                {
                    b.OwnsMany("Domain.ValueObjects.Rating", "Ratings", b1 =>
                        {
                            b1.Property<Guid>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("uniqueidentifier");

                            b1.Property<long>("AppUserId")
                                .HasColumnType("bigint");

                            b1.Property<byte>("Value")
                                .HasColumnType("tinyint");

                            b1.HasKey("Id");

                            b1.HasIndex("AppUserId");

                            b1.ToTable("Ratings");

                            b1.WithOwner()
                                .HasForeignKey("AppUserId");
                        });

                    b.Navigation("Ratings");
                });

            modelBuilder.Entity("Domain.Entities.Group", b =>
                {
                    b.HasOne("Domain.Entities.ApplicationUser", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("Domain.ValueObjects.Location", "Location", b1 =>
                        {
                            b1.Property<long>("GroupId")
                                .HasColumnType("bigint");

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

            modelBuilder.Entity("Domain.Entities.GroupInvite", b =>
                {
                    b.HasOne("Domain.Entities.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.ApplicationUser", "InvitedApplicationUser")
                        .WithMany()
                        .HasForeignKey("InvitedAppUserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Domain.Entities.ApplicationUser", "InvitingApplicationUser")
                        .WithMany()
                        .HasForeignKey("InvitingAppUserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Group");

                    b.Navigation("InvitedApplicationUser");

                    b.Navigation("InvitingApplicationUser");
                });

            modelBuilder.Entity("Domain.Entities.Intersections.UserGroup", b =>
                {
                    b.HasOne("Domain.Entities.ApplicationUser", "ApplicationUser")
                        .WithMany("UserGroups")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Group", "Group")
                        .WithMany("UserGroups")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("ApplicationUser");

                    b.Navigation("Group");
                });

            modelBuilder.Entity("Domain.Entities.Intersections.UserParticipatedRide", b =>
                {
                    b.HasOne("Domain.Entities.ApplicationUser", "ApplicationUser")
                        .WithMany()
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Ride", "Ride")
                        .WithMany()
                        .HasForeignKey("RideId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("ApplicationUser");

                    b.Navigation("Ride");
                });

            modelBuilder.Entity("Domain.Entities.Ride", b =>
                {
                    b.HasOne("Domain.Entities.Group", "Group")
                        .WithMany("Rides")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Domain.Entities.ApplicationUser", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.OwnsOne("Domain.ValueObjects.Location", "Location", b1 =>
                        {
                            b1.Property<long>("RideId")
                                .HasColumnType("bigint");

                            b1.Property<double>("Latitude")
                                .HasColumnType("float");

                            b1.Property<double>("Longitude")
                                .HasColumnType("float");

                            b1.HasKey("RideId");

                            b1.ToTable("Rides");

                            b1.WithOwner()
                                .HasForeignKey("RideId");
                        });

                    b.Navigation("Group");

                    b.Navigation("Location")
                        .IsRequired();

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("Domain.Entities.RideRequest", b =>
                {
                    b.HasOne("Domain.Entities.ApplicationUser", "RequestingUser")
                        .WithMany()
                        .HasForeignKey("RequestingUserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Ride", "Ride")
                        .WithMany()
                        .HasForeignKey("RideId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.ApplicationUser", "RideOwner")
                        .WithMany()
                        .HasForeignKey("RideOwnerId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.OwnsOne("Domain.ValueObjects.Location", "Location", b1 =>
                        {
                            b1.Property<long>("RideRequestId")
                                .HasColumnType("bigint");

                            b1.Property<double>("Latitude")
                                .HasColumnType("float");

                            b1.Property<double>("Longitude")
                                .HasColumnType("float");

                            b1.HasKey("RideRequestId");

                            b1.ToTable("RideRequests");

                            b1.WithOwner()
                                .HasForeignKey("RideRequestId");
                        });

                    b.Navigation("Location")
                        .IsRequired();

                    b.Navigation("RequestingUser");

                    b.Navigation("Ride");

                    b.Navigation("RideOwner");
                });

            modelBuilder.Entity("Domain.Entities.Stop", b =>
                {
                    b.HasOne("Domain.Entities.ApplicationUser", "Participant")
                        .WithMany()
                        .HasForeignKey("ParticipantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Ride", null)
                        .WithMany("Stops")
                        .HasForeignKey("RideId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("Domain.ValueObjects.Location", "Location", b1 =>
                        {
                            b1.Property<long>("StopId")
                                .HasColumnType("bigint");

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

                    b.Navigation("Participant");
                });

            modelBuilder.Entity("Domain.Entities.Vehicle", b =>
                {
                    b.HasOne("Domain.Entities.ApplicationUser", null)
                        .WithOne("Vehicle")
                        .HasForeignKey("Domain.Entities.Vehicle", "AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Entities.ApplicationUser", b =>
                {
                    b.Navigation("UserGroups");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("Domain.Entities.Group", b =>
                {
                    b.Navigation("Rides");

                    b.Navigation("UserGroups");
                });

            modelBuilder.Entity("Domain.Entities.Ride", b =>
                {
                    b.Navigation("Stops");
                });
#pragma warning restore 612, 618
        }
    }
}
