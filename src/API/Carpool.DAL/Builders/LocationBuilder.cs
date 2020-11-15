// using System;
// using Carpool.Core.Models;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Metadata.Builders;
//
// namespace Carpool.DAL.Builders
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