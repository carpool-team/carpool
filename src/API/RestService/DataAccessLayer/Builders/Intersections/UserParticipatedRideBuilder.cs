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

			builder.HasKey(x => new {x.RideId, UserId = x.AppUserId});

			builder.HasOne(x => x.ApplicationUser)
				.WithMany()
				.HasForeignKey(x => x.AppUserId)
				.OnDelete(DeleteBehavior.NoAction);
		}
	}
}