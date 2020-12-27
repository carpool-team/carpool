using Domain.Aggregates;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccessLayer.Builders
{
	public class RecurringRidesBuilder : IEntityTypeConfiguration<RecurringRides>
	{
		public void Configure(EntityTypeBuilder<RecurringRides> builder)
		{
			builder.ToTable("RecurringRides");

			builder.HasKey(x => x.Id);

			builder.HasMany(x => x.Rides)
			       .WithOne()
			       .HasForeignKey(a => a.RecurringRideId);
		}
	}
}