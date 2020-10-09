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

			builder.HasOne(x => x.Group)
			       .WithOne()
			       .HasForeignKey<GroupInvite>(x => x.GroupId);

			builder.HasOne(x => x.InvitedUser)
			       .WithMany()
			       .HasForeignKey(x => x.InvitedUserId);

			builder.HasOne(x => x.Inviter)
			       .WithMany()
			       .HasForeignKey(x => x.InviterId);
		}
	}
}