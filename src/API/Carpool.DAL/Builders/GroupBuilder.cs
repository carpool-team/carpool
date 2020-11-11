using System;
using Carpool.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Carpool.DAL.Builders
{
	public class GroupBuilder : IEntityTypeConfiguration<Group>
	{
		public void Configure(EntityTypeBuilder<Group> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));

			builder.HasKey(x => x.Id);

			builder.Property(x => x.Code);
			builder.Property(x => x.Name).IsRequired();

            //builder.HasMany(x => x.Rides)
            //       .WithOne()
            //       .HasForeignKey(x => x.GroupId)
            //       .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.UserGroups)
                   .WithOne(x => x.Group)
                   .HasForeignKey(ug => ug.GroupId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Location)
			       .WithMany()
			       .HasForeignKey(x => x.LocationId)
			       .OnDelete(DeleteBehavior.Cascade);


			// builder.HasOne(x => x.Owner)
			//        .WithOne()
			//        .HasForeignKey<Group>(x => x.OwnerId);
		}
	}
}