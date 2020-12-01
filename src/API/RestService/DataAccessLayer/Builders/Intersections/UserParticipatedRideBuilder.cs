using System;
using Domain.Entities.Intersections;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccessLayer.Builders.Intersections
{
	public class UserParticipatedRideBuilder : IEntityTypeConfiguration<UserParticipatedRide>
	{
		public void Configure(EntityTypeBuilder<UserParticipatedRide> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));

			builder.HasKey(x => new {x.RideId, x.UserId});

			builder.HasOne(x => x.ApplicationUser)
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