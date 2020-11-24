// using System;
// using Domain.Models;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Metadata.Builders;
//
// namespace DataAccessLayer.Builders
// {
// 	public class LocationBuilder : IEntityTypeConfiguration<Location>
// 	{
// 		public void Configure(EntityTypeBuilder<Location> builder)
// 		{
// 			_ = builder ?? throw new NullReferenceException(nameof(builder));
// 			builder.Property(x => x.Latitude).IsRequired();
// 			builder.Property(x => x.Longitude).IsRequired();
// 		}
// 	}
// }

