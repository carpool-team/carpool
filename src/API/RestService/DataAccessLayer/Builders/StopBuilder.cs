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

			builder.HasKey(x => x.Id);

			builder.OwnsOne(x => x.Location);
		}
	}
}