using System;
using Domain.Entities.Intersections;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccessLayer.Builders.Intersections
{
	public class UserGroupBuilder : IEntityTypeConfiguration<UserGroup>
	{
		public void Configure(EntityTypeBuilder<UserGroup> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));

			builder.HasKey(x => new {x.GroupId, UserId = x.AppUserId});
			builder.Property(x => x.IsSoftDeleted).IsRequired().HasDefaultValue(false);

			builder.HasOne(x => x.ApplicationUser)
				.WithMany(x => x.UserGroups)
				.HasForeignKey(x => x.AppUserId)
				.OnDelete(DeleteBehavior.NoAction);

			builder.HasOne(x => x.Group)
				.WithMany(x => x.UserGroups)
				.HasForeignKey(x => x.GroupId)
				.OnDelete(DeleteBehavior.NoAction);
		}
	}
}