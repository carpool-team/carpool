using System;
using Carpool.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Carpool.DAL.Builders
{
	public class GroupInviteBuilder : IEntityTypeConfiguration<GroupInvite>
	{
		public void Configure(EntityTypeBuilder<GroupInvite> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));

			builder.HasKey(x => x.Id);

			builder.Property(x => x.IsAccepted).IsRequired();
			builder.Property(x => x.IsPending).IsRequired();
			builder.Property(x => x.DateAdded).IsRequired();

			// builder.HasOne(x => x.Group)
			//        .WithMany()
			//        .HasForeignKey(x => x.GroupId);
		}
	}
}