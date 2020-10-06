using System;
using Carpool.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Carpool.DAL.Builders
{
	public class UserBuilder : IEntityTypeConfiguration<User>
	{
		public void Configure(EntityTypeBuilder<User> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));
			builder.HasKey(x => x.Id);

			builder.Property(x => x.FirstName);
			builder.Property(x => x.LastName);

			builder.HasMany(x => x.Ratings)
			       .WithOne()
			       .HasForeignKey(r => r.UserId);

			builder.HasMany(x => x.CreatedRides)
			       .WithOne()
			       .HasForeignKey(r => r.OwnerId);

			builder.HasMany(x => x.GroupInvites)
			       .WithOne()
			       .HasForeignKey(i => i.InvitedUserId);

			builder.HasMany(x => x.ParticipatedRides)
			       .WithOne()
			       .HasForeignKey(r => r.UserId);

			builder.HasMany(x => x.RideRequests)
			       .WithOne()
			       .HasForeignKey(r => r.RequesterId);

			builder.HasMany(x => x.UserGroups)
			       .WithOne()
			       .HasForeignKey(ug => ug.UserId);

			builder.HasMany(x => x.SentGroupInvites)
			       .WithOne()
			       .HasForeignKey(i => i.InviterId);

			builder.HasOne(x => x.Vehicle)
			       .WithOne()
			       .HasForeignKey<Vehicle>(v => v.OwnerId);
		}
	}
}