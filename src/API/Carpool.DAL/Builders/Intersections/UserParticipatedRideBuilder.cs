using System;
using Carpool.Core.Models.Intersections;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Carpool.DAL.Builders.Intersections
{
	public class UserParticipatedRideBuilder : IEntityTypeConfiguration<UserParticipatedRide>
	{
		public void Configure(EntityTypeBuilder<UserParticipatedRide> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));

			builder.HasKey(x => new {x.RideId, x.UserId});

            builder.HasOne(x => x.User)
                .WithMany()
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(x => x.Ride)
                .WithMany()
                .HasForeignKey(x => x.RideId)
                .OnDelete(DeleteBehavior.NoAction);
        }
	}
}