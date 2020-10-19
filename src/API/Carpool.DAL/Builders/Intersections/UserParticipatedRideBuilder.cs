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
		}
	}
}