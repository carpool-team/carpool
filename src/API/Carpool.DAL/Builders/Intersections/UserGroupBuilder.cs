using System;
using Carpool.Core.Models.Intersections;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Carpool.DAL.Builders.Intersections
{
	public class UserGroupBuilder : IEntityTypeConfiguration<UserGroup>
	{
		public void Configure(EntityTypeBuilder<UserGroup> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));

			builder.HasKey(x => new {x.GroupId, x.UserId});

			builder.HasOne(x => x.Group)
			       .WithMany()
			       .HasForeignKey(x => x.GroupId);

			builder.HasOne(x => x.User)
			       .WithMany()
			       .HasForeignKey(x => x.UserId);
		}
	}
}