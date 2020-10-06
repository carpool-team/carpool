using System;
using Carpool.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Carpool.DAL.Builders
{
	public class CoordinatesBuilder : IEntityTypeConfiguration<Coordinates>
	{
		public void Configure(EntityTypeBuilder<Coordinates> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));

			builder.HasKey(x => x.Id);

			builder.Property(x => x.Longitude).IsRequired();
			builder.Property(x => x.Latitude).IsRequired();
		}
	}
}