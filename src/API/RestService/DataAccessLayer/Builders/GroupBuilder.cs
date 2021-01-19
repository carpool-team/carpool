using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccessLayer.Builders
{
	public class GroupBuilder : IEntityTypeConfiguration<Group>
	{
		public void Configure(EntityTypeBuilder<Group> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));

			builder.HasKey(x => x.Id);

			builder.Property(x => x.Code);
			builder.Property(x => x.Name).IsRequired();
			builder.Property(x => x.IsSoftDeleted).IsRequired().HasDefaultValue(false);

			//builder.HasMany(x => x.Rides)
			//       .WithOne()
			//       .HasForeignKey(x => x.GroupId)
			//       .OnDelete(DeleteBehavior.Cascade);

			builder.HasMany(x => x.UserGroups)
				.WithOne(x => x.Group)
				.HasForeignKey(ug => ug.GroupId)
				.OnDelete(DeleteBehavior.NoAction);

			builder.HasMany(x => x.GroupInvites)
				.WithOne(x => x.Group)
				.HasForeignKey(x => x.GroupId)
				.OnDelete(DeleteBehavior.NoAction);

			builder.OwnsOne(x => x.Location);

			// builder.HasOne(x => x.Owner)
			//        .WithOne()
			//        .HasForeignKey<Group>(x => x.OwnerId);
		}
	}
}