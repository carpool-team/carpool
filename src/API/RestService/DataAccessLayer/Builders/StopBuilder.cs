using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccessLayer.Builders
{
	public class StopBuilder : IEntityTypeConfiguration<Stop>
	{
		public void Configure(EntityTypeBuilder<Stop> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));

			builder.HasKey(x => new {x.ParticipantId, x.RideId});

			builder.OwnsOne(x => x.Location);

			builder.HasOne(x => x.Participant)
			       .WithMany()
			       .HasForeignKey(x => x.ParticipantId);
		}
	}
}