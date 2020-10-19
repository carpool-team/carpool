using System;
using Carpool.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Carpool.DAL.Builders
{
	public class RideRequestBuilder : IEntityTypeConfiguration<RideRequest>
	{
		public void Configure(EntityTypeBuilder<RideRequest> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));

			builder.HasKey(x => x.Id);

			builder.Property(x => x.Date).IsRequired();

			builder.HasOne(x => x.Destination)
			       .WithMany()
			       .HasForeignKey(x => x.DestinationId)
					.OnDelete(DeleteBehavior.ClientNoAction);
                   

			builder.HasOne(x => x.StartingLocation)
			       .WithMany()
			       .HasForeignKey(x => x.StartingLocationId)
                   .OnDelete(DeleteBehavior.ClientNoAction);
        }
	}
}